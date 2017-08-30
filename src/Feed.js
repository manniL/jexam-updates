import Config from '../config.json'
import axios from 'axios'

export default class Feed {
  static async load (feedURL) {
    const apiKey = Config.rss2json
    try {
      const response = await axios.get('https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(feedURL) + '&api_key=' + apiKey)
      return response.data
    } catch (error) {
      console.log('Error while getting feed', error)
    }
  }
}