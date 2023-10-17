import { Module } from '@nestjs/common'

import TrackModule from './module/module'

@Module({
	imports: [TrackModule]
})

export default class IndexModule {}
