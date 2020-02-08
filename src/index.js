import Twitter from 'twit'
import Feed from './Feed'
import Config from '../config.json'
import fs from 'fs-extra'
import { existsSync } from 'fs'
import { isEqual } from 'lodash'
import Logger from './Logger'

const twitterClient = new Twitter(Config.twitter)
const feedUrl = 'http://feeds.feedburner.com/jExam?'

const handleData = async function (newData) {
  const lastData = await getLastData()

  const hasNoLastData = lastData === false
  if(hasNoLastData) {
    writeToLast(newData)
    return
  }

  if (isEqual(lastData.description, newData.description)) {
    Logger.info('No changes detected')
    return
  }

  writeToLast(newData)

  if (!newData.title.includes('Prüfungsergebnisse')) {
    Logger.info('Changes detected but unrelated to exam results')
    return
  }
  twitterChanges()
}

const writeToLast = async function (jsonObject) {
  try {
    await fs.writeJson('last.json', jsonObject)
    Logger.info('Successfully saved the new feed')
  } catch (error) {
    Logger.error(`Failed while saving new feed: ${error}`)
  }
}

const twitterChanges = async () => {
  const random = Math.random().toString(36).slice(2, 6)
  if (process.env.NODE_ENV !== 'production') {
    Logger.info('Results have been updated! Not tweeting because I am not in production mode')
    return
  }
  Logger.info('Results have been updated! Tweeting now')

  const status = `Beep boop, jExam result have been updated! To see what has been changed, visit https://jexam.inf.tu-dresden.de/ | ${random}`
  try {
    const { data } = await twitterClient.post('statuses/update', { status })

    if (data.errors) {
      Logger.error('Tweeting failed', data.errors)
      return
    }
    Logger.info('Tweeted successfully')
  } catch (e) {
    Logger.error(`Tweeting failed: ${e}`)
  }
}

const hasLastData = () => existsSync('last.json')

const getLastData = async () => {
  if (!hasLastData()) {
    return false
  }

  try {
    return fs.readJson('last.json')
  } catch (e) {
    Logger.error('Failed to read last.json', e)
    return {}
  }
}

async function hereWeGo () {
  Logger.info('Hey! Let\'s get ready to scan')
  try {
    const [firstEntry] = await Feed.load(feedUrl)
    await handleData(firstEntry)
  } catch (error) {
    Logger.error('Something unexpected happened!', error)
  }
}

hereWeGo().then(() => Logger.info('Done!'))
