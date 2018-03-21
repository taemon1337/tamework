import http from './http'
import accountApi from './accounts'
import appletApi from './applets'
import userApi from './users'
import groupApi from './groups'

export default {
  http: http,
  account: accountApi,
  applet: appletApi,
  users: userApi,
  groups: groupApi
}
