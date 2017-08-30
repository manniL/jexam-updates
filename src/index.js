import Twitter from 'twit'
import Feed from './Feed'
import Config from '../config.json'
import fs from 'fs-extra'
import { existsSync } from 'fs'
import { isEqual } from 'lodash'
import Logger from './Logger'

const twitterClient = new Twitter(Config.twitter)
const random = Math.random().toString(36).slice(2, 6)
//Add random parameter to bust cache
const feedUrl = `http://feeds.feedburner.com/jExam?`

const handleData = async function (newData) {
  const lastData = await getLastData()
  if (!isEqual(lastData.content, newData.content)) {
    await writeToLast(newData) //Don't wait for write op here
    if (newData.title.includes('Prüfungsergebnisse')) {
      twitterChanges()
    }
  } else {
    Logger.info('No changes detected')
  }
}

const writeToLast = async function (jsonObject) {
  fs.writeJson('last.json', jsonObject)
    .then(() => Logger.info('Successful written the new feed', jsonObject))
    .catch((err) => Logger.error(`Failed while writing new feed: ${err}`))
}

const twitterChanges = () => {
  Logger.info('Results have been updated! Tweeting now')
  twitterClient
    .post('statuses/update', {
      status: 'Beep boop, jExam result have been updated! To see what has' +
      ' been changed, visit https://jexam.inf.tu-dresden.de/ | ' + random
    })
    .catch((e) => Logger.error(`Tweeting failed: ${e}`))
    .then((resp) => {
      if (resp.data.errors) {
        Logger.error('Tweeting failed', resp.data.errors)
      } else {
        Logger.info('Tweeted successfully')
      }
    })

}

const getLastData = async () => {
  if (!existsSync('last.json')) {
    await writeToLast({})
  }
  try {
    return fs.readJson('last.json')
  } catch (e) { Logger.error('Failed to read last.json', e)}
}

async function hereWeGo () {
  Logger.info('Hey! Let\'s get ready to scan')
  try {
    const data = await Feed.load(feedUrl)
    await handleData(data[0]) // Only take the first time
  } catch (error) {
    Logger.error('Something unexpected happened!', error)
  }
}

hereWeGo().then(() => Logger.info('Done!'))