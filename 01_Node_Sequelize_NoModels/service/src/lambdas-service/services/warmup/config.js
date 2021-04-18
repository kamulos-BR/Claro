module.exports = {
    "group1": {
        "timeout": 120,
        "events": [{
            "schedule": {
                "enabled": "true",
                "rate": "cron(0/5 * * * ? *)"
            }}]
    },
    "group2": {
        "timeout": 120,
        "events": [{
            "schedule": {
                "enabled": "true",
                "rate": "cron(0/5 * * * ? *)"
            }}]
    }
};

