import Logger from './Logger'
import feedparser from 'feedparser-promised'

export default class Feed {
  static async load (feedURL) {
    const options = {
      uri: feedURL,
      timeout: 3000,
      gzip: true
    }
    try {
      return feedparser.parse(options)
    } catch (error) {
      Logger.error('Error while getting feed', error)
    }
  }
}
