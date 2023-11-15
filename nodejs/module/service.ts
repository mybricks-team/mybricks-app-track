import { Injectable } from '@nestjs/common'
import API from '@mybricks/sdk-for-app/api'
import { Logger } from '@mybricks/rocker-commons'

@Injectable()
export default class Service {
  async publish({userId, fileId, json, title, req}) {
    Logger.info(`[publish] create track material: ${fileId}`);

    const res = await API.Material.createCommonMaterial({
      userId,
      namespace: `spm_plan_${fileId}`,
      title,
      type: 'spm',
      content: encodeURIComponent(JSON.stringify(json)),
    })
    console.log(res)

    Logger.info(`[publish] create track material success: ${fileId}`);

    Logger.info(`[publish] publish track file: ${fileId}`);

    await API.File.publish({
      userId,
      fileId,
      extName: 'theme',
      content: encodeURIComponent(JSON.stringify(json))
    })

    Logger.info(`[publish] publish track file success: ${fileId}`);

    return {
      code: 1,
      message: null
    }
  }
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
