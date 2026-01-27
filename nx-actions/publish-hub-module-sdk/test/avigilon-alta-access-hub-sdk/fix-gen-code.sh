#!/usr/bin/env bash

if [ -f "generated/api/NodeApi.ts" ]; then
  if [ "$(uname)" == "Darwin" ]; then
    sed -i '' "s/danaOrgId: ObjectSerializer/'dana-org-id': ObjectSerializer/g" generated/api/NodeApi.ts
  else
    sed -i "s/danaOrgId: ObjectSerializer/'dana-org-id': ObjectSerializer/g" generated/api/NodeApi.ts
  fi
fi

# If this is dana, got to fix up the org constructor
if [ -f "generated/model/HydraOrg.ts" ]; then
  if [ "$(uname)" == "Darwin" ]; then
    sed -i '' 's/super(id, ownerId, name, type, status, enabled, origin, created, deleted, updated, externalId, hidden, selfRegistration, invitationsEnabled, adminGroupId, memberGroupId, slug, visibility, membershipPolicy, supportEmail, avatarUrl, domains);/super(id, ownerId, name, type, status, enabled, origin, hidden, selfRegistration, invitationsEnabled, adminGroupId, memberGroupId, slug, visibility, membershipPolicy, created, deleted, updated, externalId, supportEmail, avatarUrl, domains);/g' ./generated/model/Org.ts
    sed -i '' 's/super(id, ownerId, name, type, status, enabled, origin, created, deleted, updated, externalId, hidden, selfRegistration, invitationsEnabled, adminGroupId, memberGroupId, slug, visibility, membershipPolicy, supportEmail, avatarUrl, domains);/super(id, ownerId, name, type, status, enabled, origin, hidden, selfRegistration, invitationsEnabled, adminGroupId, memberGroupId, slug, visibility, membershipPolicy, created, deleted, updated, externalId, supportEmail, avatarUrl, domains);/g' ./generated/model/UserMembershipInfo.ts
  else
    sed -i 's/super(id, ownerId, name, type, status, enabled, origin, created, deleted, updated, externalId, hidden, selfRegistration, invitationsEnabled, adminGroupId, memberGroupId, slug, visibility, membershipPolicy, supportEmail, avatarUrl, domains);/super(id, ownerId, name, type, status, enabled, origin, hidden, selfRegistration, invitationsEnabled, adminGroupId, memberGroupId, slug, visibility, membershipPolicy, created, deleted, updated, externalId, supportEmail, avatarUrl, domains);/g' ./generated/model/Org.ts
    sed -i 's/super(id, ownerId, name, type, status, enabled, origin, created, deleted, updated, externalId, hidden, selfRegistration, invitationsEnabled, adminGroupId, memberGroupId, slug, visibility, membershipPolicy, supportEmail, avatarUrl, domains);/super(id, ownerId, name, type, status, enabled, origin, hidden, selfRegistration, invitationsEnabled, adminGroupId, memberGroupId, slug, visibility, membershipPolicy, created, deleted, updated, externalId, supportEmail, avatarUrl, domains);/g' ./generated/model/UserMembershipInfo.ts
  fi
fi

# If this is anything with AppOrgProfileView, got to fix up the constructor
if [ -f "generated/model/AppOrgProfileView.ts" ]; then
  if [ "$(uname)" == "Darwin" ]; then
    sed -i '' 's/super(id, ownerId, name, type, status, enabled, origin, created, deleted, updated, externalId, hidden, selfRegistration, invitationsEnabled, adminGroupId, memberGroupId, slug, visibility, membershipPolicy, supportEmail, avatarUrl, domains);/super(id, ownerId, name, type, status, enabled, origin, hidden, selfRegistration, invitationsEnabled, adminGroupId, memberGroupId, slug, visibility, membershipPolicy, created, deleted, updated, externalId, supportEmail, avatarUrl, domains);/g' ./generated/model/AppOrgProfileView.ts
  else
    sed -i 's/super(id, ownerId, name, type, status, enabled, origin, created, deleted, updated, externalId, hidden, selfRegistration, invitationsEnabled, adminGroupId, memberGroupId, slug, visibility, membershipPolicy, supportEmail, avatarUrl, domains);/super(id, ownerId, name, type, status, enabled, origin, hidden, selfRegistration, invitationsEnabled, adminGroupId, memberGroupId, slug, visibility, membershipPolicy, created, deleted, updated, externalId, supportEmail, avatarUrl, domains);/g' ./generated/model/AppOrgProfileView.ts
  fi
fi
