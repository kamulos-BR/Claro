'use strict';
const AWS = require('aws-sdk');
const fs = require('fs');
const _ = require('lodash');
/**
 * Represents an abstraction of the S3 service for common operations.
 */
class s3new {
    constructor(bucket, region = 'sa-east-1') {
        this.bucket = bucket;
        this.S3 = new AWS.S3({
            apiVersion: '2006-03-01',
            region: region
        });
    }

    /**
     * Writes an object as a text file to an s3 bucket
     * @param {*} data
     * @param {*} key
     * @param {*} folder
     */
    async writeTextToBucket(data, key, folder) {
        if (!data) {
            data = {};
        }

        let s3Key = folder ? `${folder}/${key}` : key;

        return await this.S3.putObject({
            Bucket: this.bucket,
            Key: s3Key,
            Body: JSON.stringify(data),
            ContentType: 'text/plain'
        }).promise();
    }
    async writeObjectToBucket(data, key, folder, contentType) {
        if (!data) {
            data = {};
        }

        let s3Key = folder ? `${folder}/${key}` : key;

        return await this.S3.putObject({
            Bucket: this.bucket,
            Key: s3Key,
            Body: data,
            ContentType: contentType
        }).promise();
    }


    /**
     * Writes an object as base 64 to an s3 bucket
     * @param {*} data
     * @param {*} key
     * @param {*} folder
     * @param {*} contentType
     */
    async writeObjectBase64ToBucket(data, key, folder, contentType) {
        if (!data) {
            data = {};
        }

        let s3Key = folder ? `${folder}/${key}` : key;
        let buf = new Buffer(data,'base64');
        return await this.S3.putObject({
            Bucket: this.bucket,
            Key: s3Key,
            Body: buf,
            ContentType: contentType,
            ContentEncoding: 'base64'
        }).promise();
    }


    /**
     * Gets the contents of a file in S3 as a raw text string.
     * @param {*} key
     * @param {*} folder
     */
    async getTextFromBucket(key, folder) {
        let s3Key = folder ? `${folder}/${key}` : key;
        let data = await this.S3.getObject({
            Bucket: this.bucket,
            Key: s3Key
        }).promise();
        return data.Body.toString();
    }

    /**
     * Gets the contents of a file in S3 as a buffer.
     * @param {*} key
     * @param {*} folder
     */
    async getBufferFromBucket(key, folder) {
        let s3Key = folder ? `${folder}/${key}` : key;
        let data = await this.S3.getObject({
            Bucket: this.bucket,
            Key: s3Key
        }).promise();
        return data.Body;
    }

    /**
     * Deletes an object from S3
     * @param {*} key
     */
    async deleteObject(key) {
        let result = await this.S3.deleteObject({
            Bucket: this.bucket,
            Key: key
        }).promise();
        return result;
    }


    /**
     * Gets the tags for an object in S3
     * @param {*} key
     */
    async getObjectTags(key) {
        let data = await this.S3.getObjectTagging({
            Bucket: this.bucket,
            Key: key
        }).promise();
        return data.TagSet;
    }

    /**
     * Validates that the indicated object exists
     * @param {*} key
     */
    async getObjectHead(key, throwIfNotFound = false) {
        let result;
        try {
            // Get the head object. If it exists, then the object is there.
            result = await this.S3.headObject({
                Bucket: this.bucket,
                Key: key
            }).promise();
        } catch (err) {
            if (throwIfNotFound) {
                throw err;
            }
            return null;
        }
        return result;
    }

    async getObjectExists(key, folder) {
        let s3Key = folder ? `${folder}/${key}` : key;
        let result;
        try {
            // Get the head object. If it exists, then the object is there.
            result = await this.S3.headObject({
                Bucket: this.bucket,
                Key: s3Key
            }).promise();
        } catch (err) {
            return null;
        }
        return result;
    }

    async uploadFile(key, filePath, contentType) {

        let result = await this.S3.upload({
            Bucket: this.bucket,
            Key: key,
            Body: fs.createReadStream(filePath),
            ACL: 'private',
            ContentType: contentType
        }).promise();
        return result;
    }

    async downloadFile(key, filePath) {
        let s3result = await this.S3.getObject({
            Bucket: this.bucket,
            Key: key
        }).promise();
        let result = {
            ContentType: s3result.ContentType,
            IsError: false
        };
        fs.writeFileSync(filePath, s3result.Body);
        return result;
    }

    async copyFileToNewBucket(sourceKey, destinationBucket, destinationKey) {
        let param = {
            CopySource: `${this.bucket}/${sourceKey}`,
            Bucket: destinationBucket,
            Key: destinationKey
        };
        return await this.S3.copyObject(param).promise();

    }

    async getPresignedUploadUrl(key, contentType = "application/octet-stream", expires = 300) {
        let param = {
            Bucket: this.bucket,
            Key: key,
            Expires: _.toNumber(expires),
            ContentType: contentType
        }
        return await this.S3.getSignedUrlPromise('putObject', param);
    }

    async getObjectsFromBucket(bucket, continuationToken) {

        const params = {
            Bucket: bucket, /* required */
            ContinuationToken: continuationToken ? continuationToken : null,
            FetchOwner: false,
            MaxKeys: 1000
        };

        let data = await this.S3.listObjectsV2(params).promise();
        return data.Contents;
    }

    async getListObjectsByPath(bucket, prefixPath, continuationToken) {
        const prefix = `${prefixPath}`;

        let data = await this.S3.listObjectsV2({
            Bucket: bucket,
            ContinuationToken: continuationToken ? continuationToken : null,
            FetchOwner: false,
            Prefix: prefix,
            MaxKeys: 1000
        }).promise();

        return data.Contents;
    }

    async deleteObjects(objects) {
        const deleteParams = {
            Bucket: this.bucket,
            Delete: {Objects: objects}
        };

        let data = await this.S3.deleteObjects(deleteParams).promise();

        return data;
    }

}

module.exports = s3new;
