
            'use strict';
            const aws = require('aws-sdk');
            aws.config.region = 'sa-east-1';
            const lambda = new aws.Lambda();
            
            const source = JSON.stringify({"source": "serverless-plugin-warmup"});
            let payload = JSON.stringify({"Payload": source});
            const custom = JSON.stringify({"custom": payload});
            const clientContext = Buffer.from(custom).toString('base64');
            
            let success = 0;
            let error = 0;

class Service {

        async group1 (event, context, callback) {
        success = 0; 
        error = 0; 
        let promise = [];  
        const list = ['all-regs-dev-dev-allRegGetAllRegs','api-los-dev-dev-apiLoGetMortgageCoach','blocks-dev-dev-blockGetListAll','boundaries-dev-dev-boundaryFindAllBoundaries','boundaries-dev-dev-boundarySearchBoundarie','boundaries-dev-dev-boundaryDeleteBoundarie','boundaries-dev-dev-boundaryUpdateBoundarie','boundaries-dev-dev-boundarySaveBoundarie','calculator-dev-dev-calculatorGetRates','calculator-dev-dev-calculatorGetRatesChuncked','calculator-dev-dev-calculatorGetRatesPerProduct','calculator-dev-dev-calculatorGetAllRatesPerProduct','calculator-dev-dev-calculatorGetActiveRateSheet','calculator-dev-dev-calculatorCalcPI','calculator-dev-dev-calculatorCheckRefiPeriod','closing-corp-dev-dev-closingCorpQuest','closing-corp-dev-dev-closingCorpSendQuest','cognito-dev-dev-cognitoAuthUser','cognito-dev-dev-cognitoCreateUser','cognito-dev-dev-cognitoChangePasswordUser','cognito-dev-dev-cognitoRefreshToken','custom-dev-dev-customSendWebsocket','custom-dev-dev-customAuthUser','custom-dev-dev-customGeneratePolicy','documents-dev-dev-documentGetDocumentGlobalDocs','documents-dev-dev-documentDownloadDocumentGlobalDocs','documents-dev-dev-documentSplitGlobalDocsDocument','documents-dev-dev-documentMergeGlobalDocsDocument','documents-dev-dev-documentGetDocumentMap','documents-dev-dev-documentPreSignDocumentGlobalDocs','documents-dev-dev-documentPreSignTempDocumentGlobalDocs','documents-dev-dev-documentGlobalDocsTransferFromTemp','documents-dev-dev-documentUploadDocumentGlobalDocs','documents-dev-dev-documentGlobalDocsTransferFromRateSheet','documents-dev-dev-documentUploadDocumentGlobalDocsFromRateSheet','documents-dev-dev-documentDeleteTempDocumentGlobalDocs','email-dev-dev-emailSendEmail','email-dev-dev-emailSendEmailNTDesk','external-dev-dev-externalSaveExternal','fees-dev-dev-feeGetFees','fees-dev-dev-feeGetLE','fees-dev-dev-feeSaveLoanEstimate','fees-dev-dev-feeGetAPR','freddie-mac-dev-dev-freddieMacPriceFreddieMac','freddie-mac-dev-dev-freddieMacGetMTM','guidelines-dev-dev-guidelineCheckModels','guidelines-dev-dev-guidelineBuildGuideline','guidelines-dev-dev-guidelineGetGuidelineLvl1','guidelines-dev-dev-guidelineFindOneGuidelineLvl1','guidelines-dev-dev-guidelineCreateGuidelineLvl1','guidelines-dev-dev-guidelineUpdateGuidelineLvl1','guidelines-dev-dev-guidelineDeleteGuidelineLvl1','guidelines-dev-dev-guidelineFindOneGuidelineLvl2','guidelines-dev-dev-guidelineCreateGuidelineLvl2','guidelines-dev-dev-guidelineUpdateGuidelineLvl2','guidelines-dev-dev-guidelineDeleteGuidelineLvl2','guidelines-dev-dev-guidelineGetGuidelineLvl2','guidelines-dev-dev-guidelineGetGuideLinesLvl2','guidelines-dev-dev-guidelineGetGuidelinesTypes','holiday-dev-dev-holidayGetHoliday','holiday-dev-dev-holidayGetCurrentHoliday','holiday-dev-dev-holidayGetValidDay','holiday-dev-dev-holidaySaveHoliday','holiday-dev-dev-holidayUpdateHoliday','holiday-dev-dev-holidayDeleteHoliday','holiday-dev-dev-holidaySearchHoliday','loan-dev-dev-loanGetLoanInformation','loan-dev-dev-loanCheckLockLoan','loan-dev-dev-loanSaveLockLoan','loan-dev-dev-loanLoanExpiration','loan-officer-dev-dev-loanOfficerGetReport','loan-officer-dev-dev-loanOfficerGetReportDetail','locations-dev-dev-locationSearchLoanAndLocation','lock-dev-dev-lockFindLocks','lock-dev-dev-lockFindLoanLocksForNTDesk','lock-dev-dev-lockFindLoanLocksForPriceException','lock-dev-dev-lockFindAllLocksByLoan','lock-dev-dev-lockFindAllLocks','lock-dev-dev-lockGetBorrowerUsingLoanID','lock-dev-dev-lockGetLoanUsingLoanID','lock-dev-dev-lockPostSavePermission','lock-dev-dev-lockPutChangeStatus','lock-dev-dev-lockGetLoanInformation','lock-dev-dev-lockLockUser','lock-dev-dev-lockGetUserPendingLocks','lock-dev-dev-lockGetInformationLock','lock-dev-dev-lockGetMIP','miquote-dev-dev-miquoteSetMIQuote','miquote-dev-dev-miquoteSetMIQuoteInvoked','miquote-dev-dev-miquoteGetMIQuoteConfig','miquote-dev-dev-miquoteDeleteMIQuote','miquote-dev-dev-miquoteGetAllMIQuote','miquote-dev-dev-miquoteGetAllMIQuoteByProduct','miquote-dev-dev-miquoteGetMIQuoteFile','miquote-dev-dev-miquoteSetQuoteStatus','miquote-dev-dev-miquoteSetDefaultQuote','miquote-dev-dev-miquoteSetDefaultQuoteByProduct','miquote-dev-dev-miquoteGetAllPrincipalMIQuote','miquote-dev-dev-miquoteGetPrincipalMIQuoteByProduct','miquote-dev-dev-miquotePurchaseMiQuote','miquote-dev-dev-miquoteGetMIQuotePurchased','miquote-dev-dev-miquoteCopyMiQuoteToLOS','miquote-dev-dev-miquoteGetCoveragePercentage','miquote-dev-dev-miquoteSaveExternal','miquote-dev-dev-miquoteGetLoanDocList','miquote-dev-dev-miquoteSendDocZip','miquote-dev-dev-miquoteGetMiQuoteCompanies','miquote-dev-dev-miquoteSetMiQuoteCompanies','models-dev-dev-modelListAll','models-dev-dev-modelDelete','models-dev-dev-modelUpdate','models-dev-dev-modelGetModel','models-dev-dev-modelSaveModel','models-dev-dev-modelGetModelGroup','models-dev-dev-modelGetAdjusters','models-dev-dev-modelGetBlock','models-dev-dev-modelGetPrice','models-dev-dev-modelBuild','models-dev-dev-modelBuildAll','models-dev-dev-modelBuildNewModel','models-dev-dev-modelListAllModels','models-dev-dev-modelGetModelsActive','models-dev-dev-modelGetInfoBasePrice','mortgage-coach-dev-dev-mortgageCoachSaveMortgageCoach','mtm-dev-dev-mtmMtmGetAll','mtm-dev-dev-mtmMtmGetData','mtm-dev-dev-mtmMtmGetCouponbyProdID','mtm-dev-dev-mtmMtmGetTopExec','mtm-dev-dev-mtmOlrGetProdDescData','mtm-dev-dev-mtmHdgBestExecution2F','mtm-dev-dev-mtmGetPricingHeaders','mtm-dev-dev-mtmHdgGetPriceDetail5e','mtm-dev-dev-mtmHdgGetPTDetailData','parameters-dev-dev-parameterListAll','parameters-dev-dev-parameterListAllCalcInputs','parameters-dev-dev-parameterListOne','parameters-dev-dev-parameterUpdateParameter','parameters-dev-dev-parameterDelete','pipeline-dev-dev-pipelinePostPipeline','pipeline-dev-dev-pipelinePostPipelineAdmin','pipeline-dev-dev-pipelineGetPipelineContacts','pipeline-dev-dev-pipelineGetPipelineManagers','products-dev-dev-productListAll','products-dev-dev-productFindAllProducts','products-dev-dev-productGetProduct','products-dev-dev-productGetProductTRIDProgramCode','products-dev-dev-productGetProductMarginGroup','products-dev-dev-productGetProductRatesheetGroup','products-dev-dev-productGetProductMortgageType','products-dev-dev-productDeleteProduct','products-dev-dev-productFindAllActiveProducts','products-dev-dev-productGetAllActiveProducts','products-dev-dev-productGetGroupAllProducts','products-dev-dev-productFindAllProductsFiltered','products-dev-dev-productFindAllProductsFilteredCount','products-dev-dev-productGetProductModel','products-dev-dev-productGetProductModelByProduct','products-dev-dev-productGetProductPeriodSpreed','products-dev-dev-productGetProductParameters','products-dev-dev-productGetProductBoundaries','products-dev-dev-productUpdateProduct','products-dev-dev-productSaveProduct','rate-sheet-dev-dev-rateSheetListAll','rate-sheet-dev-dev-rateSheetPutActiveRateSheet','rate-sheet-dev-dev-rateSheetPutDisableRateSheet','rate-sheet-dev-dev-rateSheetPostImportRateSheet','rate-sheet-dev-dev-rateSheetGetNextRateSheet','rate-sheet-dev-dev-rateSheetUploadRateSheetPDF','rate-sheet-dev-dev-rateSheetUploadAdjustorPDF','rate-sheet-dev-dev-rateSheetMergeLocationAdjustorPDF','rate-sheet-dev-dev-rateSheetMergeLocationsPDF','rate-sheet-dev-dev-rateSheetGenerateRatesheetPDFList','rate-sheet-dev-dev-rateSheetDelTemporaryLocationsPDF','rate-sheet-dev-dev-rateSheetDelRateSheetPDF','rate-sheet-dev-dev-rateSheetUpdateLocationsPDF','rate-sheet-dev-dev-rateSheetGetPreSignedUrlAdjustor','rate-sheet-dev-dev-rateSheetGetPreSignedUrlPDF','rate-sheet-dev-dev-rateSheetGetPreSignedUrlExcel','rate-sheet-dev-dev-rateSheetImportNewRateSheet','rate-sheet-dev-dev-rateSheetPutProductBoundaries','rate-sheet-dev-dev-rateSheetDelProductBoundaries','rates-base-dev-dev-ratesBaseGetRateSheetBasePrice','rates-base-dev-dev-ratesBasePostProductBasePrice','rates-base-dev-dev-ratesBasePutProductBasePrice','rates-base-dev-dev-ratesBaseDelProductBasePrice','rates-base-dev-dev-ratesBaseUpdProductBasePrice','rates-margin-dev-dev-ratesMarginGetMargins','rates-margin-dev-dev-ratesMarginGetAllMargins','rates-margin-dev-dev-ratesMarginGetGroupMargins','rates-margin-dev-dev-ratesMarginPutMargins','rates-margin-dev-dev-ratesMarginPutBulkMargins','rates-margin-dev-dev-ratesMarginDelMargins','rates-margin-dev-dev-ratesMarginDelGroupMargins','rates-margin-dev-dev-ratesMarginGetProductMarginGroup','rates-modifier-dev-dev-ratesModifierUpdModifier','rates-modifier-dev-dev-ratesModifierPutModifier','rates-modifier-dev-dev-ratesModifierDelModifier','rates-modifier-dev-dev-ratesModifierGetPeriodModifier','rates-modifier-dev-dev-ratesModifierPostProductModifiers','rates-periodsp-dev-dev-ratesPeriodspGetPeriodSpread','rates-periodsp-dev-dev-ratesPeriodspGetPeriodSpreadVs','rates-periodsp-dev-dev-ratesPeriodspNewPeriodSpreadVs','rates-periodsp-dev-dev-ratesPeriodspNewPeriodSpread','rates-periodsp-dev-dev-ratesPeriodspUpdPeriodSpread','rates-periodsp-dev-dev-ratesPeriodspPutOnePeriodSpread','rates-periodsp-dev-dev-ratesPeriodspPostOnePeriodSpread','rates-periodsp-dev-dev-ratesPeriodspPostAllPeriodSpread','scenario-dev-dev-scenarioFindScenariosUser','scenario-dev-dev-scenarioRemoveScenario','scenario-dev-dev-scenarioFindScenariosLoan','scenario-dev-dev-scenarioFindScenariosByLoanAndUser','scenario-dev-dev-scenarioFindAllScenarios','scenario-dev-dev-scenarioSaveScenario','scenario-dev-dev-scenarioUpdateScenario','sessions-dev-dev-sessionGetSessionByName','sessions-dev-dev-sessionSaveSession','sessions-dev-dev-sessionGetLocation','sessions-dev-dev-sessionGetAllLocation','sessions-dev-dev-sessionGetCredentials','sessions-dev-dev-sessionGetCredentialsAndSession','sessions-dev-dev-sessionFindScenariosUser','sessions-dev-dev-sessionRemoveScenario','sessions-dev-dev-sessionFindScenariosLoan','sessions-dev-dev-sessionFindAllScenarios','sessions-dev-dev-sessionSaveScenario','sessions-dev-dev-sessionUpdateScenario','sessions-dev-dev-sessionPostSavePermission','sessions-dev-dev-sessionFindAllLocksByLoan','sessions-dev-dev-sessionSaveBorrowers','sessions-dev-dev-sessionSaveErrorLog','sessions-dev-dev-sessionFindAllReleaseNote','sessions-dev-dev-sessionGetLastReleaseNote','sessions-dev-dev-sessionSaveReleaseNote','leads-dev-dev-userListUsers','leads-dev-dev-userGetUser','leads-dev-dev-userGetUserImpersonate','leads-dev-dev-userUpdateUser','leads-dev-dev-userCreateUser','leads-dev-dev-userGetLocationIdUser','leads-dev-dev-userDeleteUser','leads-dev-dev-userCognitoPreAuth','leads-dev-dev-userCheckUserReleaseNote','leads-dev-dev-userUpdateCustomUser','leads-dev-dev-userGetTemplate','leads-dev-dev-userGetFeatures','leads-dev-dev-userUpdateFeature','leads-dev-dev-userCreateFeature','leads-dev-dev-userDeleteFeature','leads-dev-dev-userGetFeaturesUser','leads-dev-dev-userCreateFeatureHistory','leads-dev-dev-userGetRecentLoansUser','leads-dev-dev-userSaveRecentLoanUser','leads-dev-dev-userGetAuthorization','leads-dev-dev-userUpdateEmailNotificationUser',];
        for (const lambda of list) { 
            promise.push(this.invokeLambda(lambda))
        }
                
        await Promise.all(promise);
        return {'success': success, 'error': error};
        };




        async group2 (event, context, callback) { 
        success = 0;
        error = 0;
        payload = payload.replace('serverless-plugin-warmup', 'concurrency');
        let promise = [];

        for (let i = 0; i<=120; i++) {
            promise.push(this.invokeLambda('calculator-dev-dev-calculatorGetRatesChuncked'))
        }

        await Promise.all(promise);
        return {'success': success, 'error': error};
        };
        async invokeLambda (funcName) { 
            try {
                await lambda.invoke({
                    ClientContext: clientContext,
                    FunctionName: funcName,
                    InvocationType: 'RequestResponse',
                    LogType: 'None',
                    Qualifier: '$LATEST',
                    Payload: payload
                }).promise()
                    .then(data => {
                        if (data.StatusCode === 200) {
                            success += 1;
                            console.log('SUCCESS: The Lambda ' + funcName + ' is warm!');
                        } else {
                            error += 1;
                            console.log('ERROR: The Lambda ' + funcName + ' have a problem!');
                        }
                    });
            } catch (e) {
                console.log('ERROR: The Lambda ' + funcName + ' have a problem! - Details: ', e);
            }
        };
}
module.exports = Service; 

