import { UserStatus } from './../constants/user';

/** 用户信息 */
export interface UserInfo {
	/** 用户记录 ID */
	id: number;
	/** 邮箱 */
	email: string;
	/** status 状态 -1 删除 0 禁用 1 生效 */
	status?: UserStatus;
}