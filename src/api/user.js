import request from 'utils/request'

/**
 * 
 * @param {string} mobile 手机号
 * @param {string} code 验证码
 * @returns promise
 */

export const login = (mobile, code) => {
    return request({
        method: 'POST',
        url: '/authorizations',
        data: {
            mobile,
            code,
        },
    })
}