#!/usr/bin/env bash

for lang in it en; do \
./node_modules/.bin/ng build --output-path=dist/client/$lang \
         --prod \
         --aot \
         --delete-output-path \
         --base-href /$lang/ \
         --i18n-missing-translation=error \
         --i18n-file=src/locale/messages.$lang.xlf \
         --i18n-locale=$lang; \
done
