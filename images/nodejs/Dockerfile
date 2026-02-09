FROM node:22-alpine

RUN apk update && apk upgrade && \
    apk --update --no-cache --virtual build-dependencies add \
    bash \
    g++ \
    make \
    openssh \
    ca-certificates \
    krb5-libs \
    expat \
    binutils \
    git \
    jq \
    util-linux && \
    rm -rf /var/cache/apk/*

RUN npm install npm --global --no-audit &>/dev/null
