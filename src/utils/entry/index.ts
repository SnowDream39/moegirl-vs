import nunjucks from 'nunjucks'
import { DateTime } from 'luxon'
import { OpenAIClient } from 'openai-fetch'

import template from './templates/entry.njk?raw'
import { join } from './wikitext'
import { get_lyrics } from '../websites/vocadb'
import { av2bv } from './avbv'

//  ========  导入名字   =======
import b from '@/assets/vocalists/baseVoicebanks.json'
import o from '@/assets/vocalists/originalNames.json'
import t from '@/assets/vocalists/translatedNames.json'
import c from './templates/categories.json'
import s from './templates/synthesizers.json'

const baseVoicebanks = b as Record<string, number>
const vocalistOriginalNames = o as Record<number, string>
const vocalistTranslatedNames = t as Record<string, string>
const categoryNames = c as Record<string, string>
const synthesizerNames = s as Record<string, string>

//  ========  类型定义  =========

export interface OutputConfig {
  ruby: boolean
}

type SongData = any

interface VocadbArtist {
  id: string
  name: string
  categories: string
  effectiveRoles: string
  isSupport: boolean
  artist: {
    id: string
    name: string
    artistType: string
  }
}

interface Service {
  abbr: string
  name: string
}

interface Pv {
  service: Service
  id: string
  upload: DateTime
  view: number
  sameDay: boolean
}

interface UploadGroup {
  upload: DateTime
  services: Service[]
}

// ========== 小工具函数  ==========

function addToGroup(obj: any, key: string, value: unknown) {
  if (!obj[key]) {
    obj[key] = []
  }
  obj[key].push(value)
}

async function toPhotranse(lyrics: string) {
  const client = new OpenAIClient({
    baseUrl: 'https://cors.vocabili.top/https://kuroshiro-api.dream39snow.workers.dev/v1',
    apiKey: '123',
  })

  const res = await client.createChatCompletion({
    model: 'hirakana-furigana',
    messages: [
      { role: 'system', content: '你是一个假名转换助手。' },
      { role: 'user', content: lyrics },
    ],
  })

  const rubyLyrics = res.choices[0].message.content
  if (!rubyLyrics) return lyrics
  const photransLyrics = rubyLyrics.replace(
    /<ruby>(.*?)<rp>\(<\/rp><rt>(.*?)<\/rt><rp>\)<\/rp><\/ruby>/g,
    (_match, kanji, reading) => `{{Photrans|${kanji}|${reading}}}`,
  )
  return photransLyrics
}

//  ========== 工作流函数  =============

function makeTitle(songData: SongData) {
  return songData.song.name
}

function makeAllTitles(songData: SongData) {
  return [songData.song.name] + songData.additionalNames.split(', ')
}

function getVocalistName(artist: VocadbArtist, translated: boolean) {
  let baseId: number
  if (artist.id in baseVoicebanks) {
    baseId = baseVoicebanks[artist.id]
  } else {
    baseId = Number(artist.id)
  }
  if (translated && baseId in vocalistTranslatedNames) {
    return vocalistTranslatedNames[baseId]
  } else if (
    translated &&
    !(baseId in vocalistTranslatedNames) &&
    baseId in vocalistOriginalNames
  ) {
    return vocalistOriginalNames[baseId]
  } else if (translated && !(baseId in vocalistOriginalNames)) {
    // 可以弹出一个提示
    return artist.name
  } else if (baseId in vocalistOriginalNames) {
    return vocalistOriginalNames[baseId]
  } else {
    // 可以弹出一个提示
    return artist.name
  }
}

async function makeStaff(songData: SongData) {
  let roles: string
  const staff: any = {}
  const producers: string[] = []
  for (const artist of songData.artists) {
    if (artist.categories === 'Other') {
      roles = artist.effectiveRoles
    } else if (artist.categories === 'Vocalist') {
      roles = 'Vocalist'
      artist.name = getVocalistName(artist.artist, true)
    } else if (artist.categories.includes('Producer')) {
      producers.push(artist.name)
      if (artist.effectiveRoles === 'Default') {
        roles = 'Producer' // 词·曲
      } else {
        roles = artist.effectiveRoles
      }
    } else {
      roles = artist.categories
    }
    for (const role of roles.split(', ')) {
      addToGroup(staff, role, artist.name)
    }
  }
  staff.Vocalist = Array.from(new Set(staff.Vocalist))
  return staff
}

function makeDisplayStaff(staff: any) {
  // todo
  const displayStaff = { ...staff }
  for (const category in displayStaff) {
    displayStaff[categoryNames[category]] = displayStaff[category]
    delete displayStaff[category]
  }
  return displayStaff
}

function makeType(songData: SongData) {
  const type = songData.song.songType
  if (type === 'Original') {
    return '原创'
  } else {
    return '翻唱'
  }
}

async function makeProducers(songData: SongData) {
  let roles: string
  const staff: any = {}
  const producers: string[] = []
  for (const artist of songData.artists) {
    if (artist.categories === 'Other') {
      roles = artist.effectiveRoles
    } else if (artist.categories === 'Vocalist') {
      roles = 'Vocalist'
      artist.name = getVocalistName(artist.artist, true)
    } else if (artist.categories.includes('Producer')) {
      producers.push(artist.name)
      if (artist.effectiveRoles === 'Default') {
        roles = 'Producer' // 词·曲
      } else {
        roles = artist.effectiveRoles
      }
    } else {
      roles = artist.categories
    }
    for (const role of roles.split(', ')) {
      addToGroup(staff, role, artist.name)
    }
  }
  staff.Vocalist = Array.from(new Set(staff.Vocalist))
  return producers
}

function makeVocalists(songData: SongData) {
  const vocalists: string[] = []
  for (const artist of songData.artists) {
    if (artist.categories === 'Vocalist' && !artist.isSupport)
      vocalists.push(getVocalistName(artist.artist, true))
  }
  return Array.from(new Set(vocalists))
}

function makeSynthesizers(songData: SongData) {
  const synthesizers: string[] = []
  for (const artist of songData.artists) {
    if (artist.categories.includes('Vocalist')) {
      const type = artist.artist.artistType
      const synthesizer = type in synthesizerNames ? synthesizerNames[type] : type
      if (!['OtherVoiceSynthesizer'].includes(synthesizer)) synthesizers.push(synthesizer)
    }
  }
  return Array.from(new Set(synthesizers))
}

function makeIllustrators(staff: any) {
  // to be improved
  const illustrators = 'Illustrator' in staff ? staff.Illustrator : staff.Animator
  return illustrators
}

const serviceFormat = (service: 'NicoNicoDouga' | 'Youtube' | 'Bilibili') => {
  return {
    NicoNicoDouga: { abbr: 'nnd', name: 'niconico' },
    Youtube: { abbr: 'yt', name: 'YouTube' },
    Bilibili: { abbr: 'bb', name: 'bilibili' },
  }[service]
}

function makePvs(songData: SongData) {
  const pvs: Pv[] = []
  for (const pv of songData.pvs) {
    if (
      pv.pvType === 'Original' &&
      ['NicoNicoDouga', 'Youtube', 'Bilibili'].includes(pv.service) &&
      !pvs.map((pv) => pv.service.abbr).includes(serviceFormat(pv.service).abbr)
    ) {
      pvs.push({
        service: serviceFormat(pv.service),
        id: pv.service == 'Bilibili' ? av2bv(pv.pvId) : pv.pvId,
        upload: DateTime.fromISO(pv.publishDate),
        view: 0,
        sameDay: false,
      })
    }
  }

  pvs.sort((a, b) => a.upload.toMillis() - b.upload.toMillis())
  for (let i = 1; i < pvs.length; i++) {
    if (pvs[i].upload.toMillis() == pvs[i - 1].upload.toMillis()) {
      pvs[i].sameDay = true
    }
  }

  const uploadGroups: UploadGroup[] = []
  for (const pv of pvs) {
    if (pv.sameDay === false) {
      uploadGroups.push({ upload: pv.upload, services: [pv.service] })
    } else {
      uploadGroups[uploadGroups.length - 1].services.push(pv.service)
    }
  }
  return { pvs, uploadGroups }
}

function makeBiliVideo(pvs: Pv[]) {
  for (const pv of pvs) {
    if (pv.service.abbr === 'bb') {
      return pv.id
    }
  }
  return ''
}

async function makeLyrics(
  songData: SongData,
  type: 'Original' | 'Translation',
  ruby: boolean = false,
) {
  for (const lyricInfo of songData.lyricsFromParents) {
    if (type === 'Original') {
      if (lyricInfo.translationType === 'Original') {
        const lyrics = await get_lyrics(lyricInfo.id)
        if (ruby) lyrics.value = await toPhotranse(lyrics.value)
        return lyrics
      }
    } else {
      if (lyricInfo.translationType === 'Translation' && lyricInfo.cultureCodes[0] == 'zh') {
        return await get_lyrics(lyricInfo.id)
      }
    }
  }
  return ''
}

export async function render(songData: any, config: OutputConfig): Promise<string> {
  const { pvs, uploadGroups } = makePvs(songData)
  const staff = await makeStaff(songData)
  const data = {
    l: '{{',
    r: '}}',
    staff: makeDisplayStaff(staff),
    title: makeTitle(songData),
    allTitles: makeAllTitles(songData),
    type: makeType(songData),
    producers: await makeProducers(songData),
    vocalists: makeVocalists(songData),
    synthesizers: makeSynthesizers(songData),
    illustrators: makeIllustrators(staff),
    pvs,
    uploadGroups,
    biliVideo: makeBiliVideo(pvs),
    originalLyrics: await makeLyrics(songData, 'Original', config.ruby),
    translatedLyrics: await makeLyrics(songData, 'Translation'),
    join: join,
  }

  console.log(data.staff)

  const env = nunjucks.configure('views', {
    autoescape: false,
  })

  env.addFilter('join', join)
  env.addFilter('date', function (dateObj: DateTime, formatStr: string = 'yyyy年M月d日') {
    try {
      return dateObj.toFormat(formatStr)
    } catch {
      return 'Invalid Date'
    }
  })
  return env.renderString(template, data)
}
