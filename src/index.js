import Twitter from 'twit'
import Feed from './Feed'
import Config from '../config.json'
import fs from 'fs-extra'
import { existsSync } from 'fs'
import { isEqual } from 'lodash'

const twitterClient = new Twitter(Config.twitter)
const random = Math.random().toString(36).slice(2, 6)
//Add random parameter to bust cache
const feedUrl = `http://feeds.feedburner.com/jExam?${random}`

const handleData = async function (newData) {
  const lastData = await getLastData()
  if (!isEqual(lastData, newData)) {
    await writeToLast(newData) //Don't wait for write op here
    if (newData.title.includes('Prüfungsergebnisse')) {
      twitterChanges()
    }
  } else {
    console.log('No changes')
  }
}

const writeToLast = async function (jsonObject) {
  fs.writeJson('last.json', jsonObject)
    .then(() => console.log('SUCCESS WRITING of the new feed'))
    .catch((err) => console.error(`Failed: ${err}`))
}

const twitterChanges = () => {
  console.log('Results have been updated! Tweeting now')

  twitterClient
    .post('statuses/update', {
      status: 'Beep boop, jExam result have been updated! To see what has' +
      ' been changed, visit https://jexam.inf.tu-dresden.de/ | ' + random
    })
    .catch((e) => console.log('Failed with ' + e))
    .then((resp) => {
      if (resp.data.errors) {
        console.log(resp.data.errors)
        throw new Error('Tweeting failed')
      } else {
        console.log('Tweeted successfully')
      }
    })
}

const getLastData = async () => {
  if (!existsSync('last.json')) {
    await writeToLast({})
  }
  try {
    return fs.readJson('last.json')
  } catch (e) { console.log(e)}
}

async function hereWeGo () {
  const data = (await Feed.load(feedUrl)).items[0]
  await handleData(data)
}

hereWeGo().then(() => console.log('Done checking'))