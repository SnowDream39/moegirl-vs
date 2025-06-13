import axiosProxy from '@/utils/axiosProxy'
import * as cheerio from 'cheerio'
import type { SongData } from '@/types/billboard'

async function billboard() {
  const songs_data: SongData[] = []
  try {
    const response = await axiosProxy.get(
      '/https://www.billboard-japan.com/charts/detail?a=niconico',
    ) // 使用 await 来处理异步请求
    const $ = cheerio.load(response.data)
    const table = $('body').find('tbody')
    const song_datas = table.find('tr')

    song_datas.each((_index, element) => {
      const data = $(element)
      const rank = data.find('[headers=rank]')
      const name = data.find('[headers=name]')

      const song_data: SongData = {
        current: Number(rank.children().first().text().trim()),
        change: rank.children().eq(1).attr('class')!,
        former: Number(rank.children().eq(1).text()),
        image: `https://www.billboard-japan.com${name.find('img').first().attr('src')!.trim()}`,
        title: data.find('.musuc_title').first().text().trim(),
        link: '',
        artist: name.find('.artist_name').text().trim(),
      }

      if (name.find('.musuc_title').first().find('a')) {
        song_data.link = name.find('.musuc_title').find('a').attr('href')!
      }

      songs_data.push(song_data)
    })
  } catch (error) {
    console.log('error', error)
  }

  return songs_data
}

export { billboard }
