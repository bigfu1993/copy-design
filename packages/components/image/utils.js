import axios from "axios";

export class InfraRedPic {
  constructor() {
    this.version = ''
    this.width = 0
    this.height = 0
    this.datetime = ''
    this.IRDatas = []
    this.emiss = 0
    this.envTemperature = 0
    this.len = 0
    this.distance = 0
    this.humidity = 0
    this.reflectTemperature = 0
    this.producer = ''
    this.type = ''
    this.serialNo = ''
    this.longitude = 0
    this.latitude = 0
    this.altitude = 0
    this.desLength = 0
    this.description = ''
    this.offset = 0
  }

  async init(url) {
    return new Promise(async (resolve, reject) => {
      try {
        const arrayBuffer = (await axios.get( url, { responseType: 'arraybuffer' })).data
        const length = arrayBuffer.byteLength
        const dataView = new DataView(arrayBuffer)
        this.offset = dataView.getUint32(length - 20, true)
        let offset = this.offset
        this.version = (+dataView.getUint16(offset, true).toString(16)).toFixed(1)
        offset += 2
        this.width = dataView.getUint16(offset, true)
        offset += 2
        this.height = dataView.getUint16(offset, true)
        offset += 2
        let datetime = ''
        for (let i = 0; i < 14; i++) {
          const num = dataView.getUint8(offset + i)
          if (num === 0) break
          datetime += String.fromCharCode(num)
          if (i === 3 || i ===5) datetime += '-'
          if (i === 7) datetime += ' '
          if (i === 9 || i === 11) datetime += ':'
        }
        this.datetime = datetime
        offset += 14
        const size = this.width * this.height * 4
        for (let i = 0; i < this.height; i++) {
          const rowData = []
          for (let j = 0; j < this.width * 4; j += 4) {
            const IRData = dataView.getFloat32(offset + i * this.width * 4 + j, true)
            rowData.push(IRData)
          }
          this.IRDatas.push(rowData)
        }
        offset += size
        this.emiss = dataView.getFloat32(offset, true)
        offset += 4
        this.envTemperature = dataView.getFloat32(offset, true)
        offset += 4
        this.len = dataView.getUint8(offset)
        offset += 1
        this.distance = dataView.getUint32(offset, true)
        offset += 4
        this.humidity = dataView.getUint8(offset)
        offset += 1
        this.reflectTemperature = dataView.getFloat32(offset, true)
        offset += 4
        let producer = ''
        for (let i = 0; i < 32; i++) {
          const num = dataView.getUint8(offset + i)
          if (num === 0) break
          producer += String.fromCharCode(num)
        }
        this.producer = producer.replace(/0+/, '')
        offset += 32
        let type = ''
        for (let i = 0; i < 32; i++) {
          const num = dataView.getUint8(offset + i)
          if (num === 0) break
          type += String.fromCharCode(num)
        }
        this.type = type.replace(/0+/, '')
        offset += 32
        let serialNo = ''
        for (let i = 0; i < 32; i++) {
          const num = dataView.getUint8(offset + i)
          if (num === 0) break
          serialNo += String.fromCharCode(num)
        }
        this.serialNo = serialNo.replace(/0+/, '')
        offset += 32
        this.longitude = dataView.getFloat64(offset, true)
        offset += 8
        this.latitude = dataView.getFloat64(offset, true)
        offset += 8
        this.altitude = dataView.getUint32(offset, true)
        offset += 4
        this.desLength = dataView.getUint32(offset, true)
        offset += 4
        const decoder = new TextDecoder()
        this.description = decoder.decode(arrayBuffer.slice(offset, offset + this.desLength))
        offset += this.desLength
        if (offset !== arrayBuffer.byteLength - 20) reject(new Error('文件数据格式错误，请检查后重试'))
        else resolve()
      } catch (e) {
        reject(e)
      }
    })
  }

  getVersion() { return this.version }
  getWidth() { return this.width }
  getHeight() { return this.height }
  getDatetime() { return this.datetime }
  getIRDatas() { return this.IRDatas }
  getEmiss() { return this.emiss }
  getEnvTemperature() { return this.envTemperature }
  getLen() { return this.len }
  getDistance() { return this.distance }
  getHumidity() { return this.humidity }
  getReflectTemperature() { return this.reflectTemperature }
  getProducer() { return this.producer }
  getType() { return this.type }
  getSerialNo() { return this.serialNo }
  getLongitude() { return this.longitude }
  getLatitude() { return this.latitude }
  getAltitude() { return this.altitude }
  getDesLength() { return this.desLength }
  getDescription() { return this.description }
  getOffset() { return this.offset }

  getAllData() {
    return {
      version: this.version,
      width: this.width,
      height: this.height,
      datetime: this.datetime,
      IRDatas: this.IRDatas,
      emiss: this.emiss.toFixed(2),
      envTemperature: this.envTemperature.toFixed(2) + '℃',
      len: this.len ? this.len + '°' : '不持支该参数',
      distance: this.distance ? this.distance + '米' : '不支持该参数',
      humidity: this.humidity ? this.humidity + '%' : '不支持该参数',
      reflectTemperature: this.reflectTemperature ? this.reflectTemperature.toFixed(2) + '℃' : '不支持该参数',
      producer: this.producer || '不支持该参数',
      type: this.type || '不支持该参数',
      serialNo: this.serialNo || '不支持该参数',
      longitude: this.longitude || '不支持该参数',
      latitude: this.latitude || '不支持该参数',
      altitude: this.altitude ? this.altitude + '米' : '不支持该参数',
      desLength: this.desLength,
      description: this.description || '无描述信息',
      offset: this.offset,
    }
  }
}
