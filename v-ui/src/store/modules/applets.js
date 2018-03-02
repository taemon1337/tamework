import { AppletTypes } from '@/store/mutation-types'
import api from '@/api'

const state = {
  currentApp: 'HomePage',
  all: [
    { name: 'registrator', title: 'Applet Registrator', subtitle: 'Registry your applets here', icon: 'library_add', group: 'administrative' },
    { name: 'usermanager', title: 'User Permissions', subtitle: 'Manage User RBAC policy', icon: 'group', group: 'administrative' },
    { name: 'leegs', title: 'League Manager', subtitle: 'League and Event Registration Portal', icon: 'event_seat', group: 'social' },
    { name: 'resumer', title: 'Resumer', subtitle: 'Online Resume builder', icon: 'chrome_reader_mode', group: 'productivity' },
    { name: 'analystbook', title: 'Analyst Notebook', subtitle: 'Real time collborative analysis tool', icon: 'find_in_page', group: 'analysis' },
    { name: 'dataminer', title: 'Global Data Miner', subtitle: 'A globally distributed data miner application', icon: 'language', group: 'analysis' },
    { name: 'texel', title: 'Texel', subtitle: 'A better than excel web data processing tool', icon: 'view_column', group: 'analysis' },
    { name: 'ipgeo', title: 'IP Geolocator', subtitle: 'IP Geolocation data enrichment tool', icon: 'track_changes', group: 'analysis' },
    { name: 'regexer', title: 'Regexer', subtitle: 'Regex based data filtering tool', icon: 'view_list', group: 'analysis' },
    { name: 'reporter', title: 'Reporter', subtitle: 'A generic web based report template engine and builder', icon: 'description', group: 'productivity' },
    { name: 'mboxer', title: 'Mboxer', subtitle: 'Web based mbox parser', icon: 'mail', group: 'analysis' },
    { name: 'rider', title: 'Rider', subtitle: 'Horse show event registration', icon: 'accessibility', group: 'social' },
    { name: 'uploader', title: 'Uploader', subtitle: 'Simple and efficient file upload tool', icon: 'cloud_upload', group: 'productivity' },
    { name: 'webpst', title: 'WebPST', subtitle: 'Simple web based PST parser and reader', icon: 'mail_outline', group: 'analysis' },
    { name: 'free4', title: 'Free4', subtitle: 'Are you free for dinner or another fun event tonight?', icon: 'announcement', group: 'social' },
    { name: 'internut', title: 'Internut', subtitle: 'A long term web page cache or archiving tool', icon: 'picture_as_pdf', group: 'productivity' },
    { name: 'filedrop', title: 'File Drop', subtitle: 'A security focused blind file drop application', icon: 'file_upload', group: 'productivity' },
    { name: 'bibler', title: 'Bibler', subtitle: 'A Bible study reading guide with integrated commentaries ', icon: 'library_books', group: 'productivity' },
    { name: 'idecubator', title: 'Idecubator', subtitle: 'Tamework idea incubator.', icon: 'lightbulb_outline', group: 'administrative' },
    { name: 'webide', title: 'WebIde', subtitle: 'A simple web ide', icon: 'code', group: 'productivity' },
    { name: 'chat', title: 'Chat', subtitle: 'Simple real time chat', icon: 'chat', group: 'social' }
  ],
  groups: [
    { name: 'administrative', title: 'Tamework Admin', subtitle: 'Admin applications', icon: 'settings_applications' },
    { name: 'analysis', title: 'Data Analysis', subtitle: 'Data analysis tools', icon: 'assessment' },
    { name: 'social', title: 'Social Apps', subtitle: 'Social or user centric apps', icon: 'supervisor_account' },
    { name: 'productivity', title: 'Productivity', subtitle: 'Applications that help', icon: 'dashboard' }
  ]
}

// getters
const getters = {
  [AppletTypes.all]: state => state.all,
  [AppletTypes.groups]: state => state.groups,
  [AppletTypes.currentApp]: state => state.currentApp
}

// actions
const actions = {
  [AppletTypes.all] ({ commit }, opts) {
    api.applet.all(opts).then(records => {
      commit(AppletTypes.all, records)
    })
  },
  [AppletTypes.currentApp] ({ commit }, name) {
    commit(AppletTypes.currentApp, name)
  },
  [AppletTypes.edit] ({ commit }, record) {
    commit(AppletTypes.edit, record)
  }
}

// mutations must be synchronous
const mutations = {
  [AppletTypes.all] (state, records) {
    let keys = state.all.map(r => r.name)
    let add = []
    records.forEach(record => {
      if (keys.indexOf(record.name) === -1) {
        add.push(record)
      }
    })
    state.all = state.all.concat(add)
  },
  [AppletTypes.currentApp] (state, name) {
    let path = name ? '#/app/' + name : window.location.pathname
    window.history.pushState({}, null, path)
    state.currentApp = name || 'HomePage'
  },
  [AppletTypes.edit] (state, record) {
    state.all.forEach((a, i) => {
      if (a.name === record.name) {
        return state.all.splice(i, 1, Object.assign({}, a, record))
      }
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
