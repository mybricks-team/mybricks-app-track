import { Injectable } from '@nestjs/common'
import axios from 'axios'
import API from '@mybricks/sdk-for-app/api'

@Injectable()
export default class Service {
  async publish({userId, fileId, json, title, req}) {

    const domainName = process.env.NODE_ENV === 'development' ? 'http://localhost:8001' : getRealDomain(req)

    await axios({
      method: 'post',
      url: `${domainName}/api/material/common/create`,
      data: {
        userId,
        namespace: `spm_plan_${fileId}`,
        title,
        type: 'spm',
        content: encodeURIComponent(JSON.stringify(json)),
      }
    }).then(res => console.log(res))

    await API.File.publish({
      userId,
      fileId,
      extName: 'theme',
      content: encodeURIComponent(JSON.stringify(json))
    })

    return {
      code: 1,
      message: null
    }
  }
}

function getRealHostName(requestHeaders) {
  let hostName = requestHeaders.host
  if (requestHeaders['x-forwarded-host']) {
    hostName = requestHeaders['x-forwarded-host']
  } else if (requestHeaders['x-host']) {
    hostName = requestHeaders['x-host'].replace(':443', '')
  }
  return hostName
}

/** 有问题找zouyongsheng */
function getRealDomain(request) {
  let hostName = getRealHostName(request.headers);
  const { origin } = request.headers
  if (origin) return origin
  // let protocol = request.headers['x-scheme'] ? 'https' : 'http'
  /** TODO: 暂时写死 https */
  // let protocol = 'https';
  let protocol = request.headers?.['connection'].toLowerCase() === 'upgrade' ? 'https' : 'http'
  let domain = `${protocol}:\/\/${hostName}`
  return domain
}

function getNextVersion(version, max = 100) {
  if (!version) return "1.0.0";
  const vAry = version.split(".");
  let carry = false;
  const isMaster = vAry.length === 3;
  if (!isMaster) {
    max = -1;
  }

  for (let i = vAry.length - 1; i >= 0; i--) {
    const res = Number(vAry[i]) + 1;
    if (i === 0) {
      vAry[i] = res;
    } else {
      if (res === max) {
        vAry[i] = 0;
        carry = true;
      } else {
        vAry[i] = res;
        carry = false;
      }
    }
    if (!carry) break;
  }

  return vAry.join(".");
}
