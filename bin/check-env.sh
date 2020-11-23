#!/bin/bash

if [[ -z "$API_URL" ]]; then
    tput setaf 1
    echo "API_URL is not set. Please set a value, for example, by 'export API_URL=<api-value>'".
    tput sgr0
    exit 1
fi
exit 0
