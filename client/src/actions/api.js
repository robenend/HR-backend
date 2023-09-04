import base from '../utils/base'

export const postApi = async (path, data) => {
    try {
        let result = await base.post(path, data)
        return result
        
    } catch (err) {
        console.error(err)
        return err
    }
}

export const putApi = async (path, data, id) => {
    try {
        if(id) {
            let result = await base.get(path + id, data)
            return result
        }
        else {
            let result = await base.put(path, data)
            return result
        }
    } catch (err) {
        console.error(err)
        return err
    }
}

export const deleteApi = async (path, data) => {
    try {
        let result = await base.delete(path, data)
        return result
    } catch (err) {
        console.error(err)
        return err
    }
}

export const getApi = async (path, id) => {
    try {
        if (id) {
            let result = await base.get(path + id)
            return result
        }
        else {
            let result = await base.get(path)
            return result
        }
    } catch (err) {
        console.error(err)
    }
}

