import axios from "axios"
import { API_BASE_URL } from '@/environment'

const url = new URL('posts', API_BASE_URL)

const httpClient = axios.create({
    baseURL: url.toString(),
    withCredentials: false
})

const postsService = {
    async getAll() {
        const { data } = await httpClient.get('/')
        return data
    },
    async getOne(postId) {
        const { data } = await httpClient.get(`/${ postId }`)
        return data
    },
    async add(post) {
        const { headers: { location } } = await httpClient.post('/', post)
        return location.slice(location.lastIndexOf('/') + 1)
    },
    async update(postId, post) {
        await httpClient.patch(`/${ postId }`, post)
    },
    async delete(postId) {
        await httpClient.delete(`/${ postId }`)
    }
}

export default postsService
export { url }
