import axios from 'axios'

/**
 * @param {string} name 歌名或别名
 * @param {number} [page=0] 页码，每页10个
 */

async function getData(url: string, params: Record<string, any>) {
  const response = await axios.get(url, {
    params: params,
  })
  return response.data
}

export async function search_songs(name: string, page: number = 1, pageSize: number = 10) {
  const url = 'https://vocadb.net/api/songs'
  const params = {
    start: pageSize * (page - 1),
    getTotalCount: true,
    maxResults: pageSize,
    query: name,
    fields: 'AdditionalNames,MainPicture', // 是请求什么，不是根据什么搜索
    lang: 'Default',
    nameMatchMode: 'Auto',
    sort: 'RatingScore',
    childTags: false,
    artistParticipationStatus: 'Everything',
    onlyWithPvs: false,
  }
  return getData(url, params)
}

async function fetch_song(id: number) {
  const url = `https://vocadb.net/api/songs/${id}/details`
  const params = {}
  return getData(url, params)
}

async function fetch_lyrics(id: number) {
  const url = `https://vocadb.net/api/songs/lyrics/${id}`
  const params = {}
  return getData(url, params)
}

async function fetch_vocalist(id: number) {
  const url = `https://vocadb.net/api/artists/${id}/details`
  const params = {}
  return getData(url, params)
}

/**
 * 获取歌曲信息
 * @param {number} id 歌曲id
 */
export async function get_song_info(id: number) {
  try {
    const data = await fetch_song(id)
    return data
  } catch (error) {
    console.log('Error:', error)
  }
}

export async function get_lyrics(id: number) {
  try {
    return await fetch_lyrics(id)
  } catch (error) {
    console.log('Error:', error)
  }
}

export async function get_vocalist(id: number) {
  try {
    return await fetch_vocalist(id)
  } catch (error) {
    console.log('Error', error)
  }
}
