import { AppletTypes } from '@/store/mutation-types'

const state = {
  all: [
    { title: 'Applet Registrator', subtitle: 'Registry your applets here', icon: 'library_add', group: 'administrative' },
    { title: 'User Permissions', subtitle: 'Manage User RBAC policy', icon: 'group', group: 'administrative' },
    { title: 'League Manager', subtitle: 'League and Event Registration Portal', icon: 'event_seat', group: 'social' },
    { title: 'Resumer', subtitle: 'Online Resume builder', icon: 'chrome_reader_mode', group: 'productivity' },
    { title: 'Analyst Notebook', subtitle: 'Real time collborative analysis tool', icon: 'find_in_page', group: 'analysis' },
    { title: 'Global Data Miner', subtitle: 'A globally distributed data miner application', icon: 'language', group: 'analysis' },
    { title: 'Texel', subtitle: 'A better than excel web data processing tool', icon: 'view_column', group: 'analysis' },
    { title: 'IP Geolocator', subtitle: 'IP Geolocation data enrichment tool', icon: 'track_changes', group: 'analysis' },
    { title: 'Regexer', subtitle: 'Regex based data filtering tool', icon: 'view_list', group: 'analysis' },
    { title: 'Reporter', subtitle: 'A generic web based report template engine and builder', icon: 'description', group: 'productivity' },
    { title: 'Mboxer', subtitle: 'Web based mbox parser', icon: 'mail', group: 'analysis' },
    { title: 'Rider', subtitle: 'Horse show event registration', icon: 'accessibility', group: 'social' },
    { title: 'Uploader', subtitle: 'Simple and efficient file upload tool', icon: 'cloud_upload', group: 'productivity' },
    { title: 'WebPST', subtitle: 'Simple web based PST parser and reader', icon: 'mail_outline', group: 'analysis' },
    { title: 'Free4', subtitle: 'Are you free for dinner or another fun event tonight?', icon: 'announcement', group: 'social' },
    { title: 'Internut', subtitle: 'A long term web page cache or archiving tool', icon: 'picture_as_pdf', group: 'productivity' },
    { title: 'File Drop', subtitle: 'A security focused blind file drop application', icon: 'file_upload', group: 'productivity' },
    { title: 'Bibler', subtitle: 'A Bible study reading guide with integrated commentaries ', icon: 'library_books', group: 'productivity' },
    { title: 'Idecubator', subtitle: 'Tamework idea incubator.', icon: 'lightbulb_outline', group: 'administrative' }
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
  [AppletTypes.groups]: state => state.groups
}

// actions
const actions = {
  [AppletTypes.all] ({ commit }) {
    // foo bar
  }
}

// mutations must be synchronous
const mutations = {
  [AppletTypes.all] (state, records) {
    state.all = records
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
