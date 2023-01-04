<template>
	<div class="flex-row-center-between c-menu-wrap" :id="id" :style="`height:${height}px`">
		<!-- 背景动画 -->
		<div class="header-video-wrapper">
			<video autoplay loop muted class="wh100 header-video">
				<source :src="video.url ?? video" :type="video.type ?? 'video/mp4'">
			</video>
		</div>
		<!-- 项目介绍 -->
		<div class="flex-row-center logo-wrap">
			<slot name="project-l">
				<img v-if="project.logo" :src="project.logo" class="mr20" />
			</slot>
			<div class="nowrap logo-title">{{ project.title }}</div>
			<slot name="project-r"></slot>
		</div>
		<!-- 导航部分 -->
		<div class="h100 flex1 flex-center menu-wrap">
			<div class="menu-item" v-for="(m, i) in renderMenu" :key="i" @click="m.path && $router.push(m.path)">
				<div class="h100 gp10 flex-row-center menu">
					<i :class="`iconfont ${m.icon.indexOf('icon-') > -1 ? m.icon : `icon-${m.icon}`}`"></i>
					<span class="nowrap" v-if="showMenuText">{{ m.label }}</span>
				</div>
				<div class="flex-column children" v-if="m.children">
					<div class="nowrap flex-center children-item" v-for="(mm, ii) in m.children" :key="ii"
						@click.stop="mm.path && $router.push(mm.path)">
						<span>{{ mm.label }}</span>
					</div>
				</div>
			</div>
		</div>
		<!-- 导航扩展 -->
		<div class="gp10 flex-row-center extend-wrap">
			<slot name='extend-l'></slot>
			<div v-if="project.hasRole" class="cursor flex-row-center user-item">
				<i class="iconfont icon-user"></i>
				<span class="mlr5 nowrap text">{{ username || "未知" }}</span>
				<i class="iconfont icon-zhankai"></i>
				<div class="user-panel-wrapper">
					<div class="user-panel">
						<template v-for="panel in panels" :key="panel.id">
							<div class="panel-item" @click="emit('transInfo', panel.id)">
								{{ panel.label }}
							</div>
							<div v-if="panel.withDivider" class="panel-divider"></div>
						</template>
					</div>
				</div>
			</div>
			<slot name='extend-r'></slot>
			<i class="ws-status iconfont icon-icon-"
				:class="{ connect: connection === 1, message: connection === 2 }"></i>
		</div>
	</div>
</template>

<script lang="ts">
export default { name: "c-menu" };
</script>
<script setup  lang="ts">
import { ref, watch, computed, onMounted, onUnmounted, PropType } from 'vue'

const props = defineProps({
	project: {
		type: Object,
		default: () => {
			return {
				title: '项目名称Project name',
				logo: '',
				hasRole: true,
			}
		}
	},
	height: {
		type: Number,
		default: 80
	},
	menus: {
		type: Array,
		default: () => [],
	},
	fields: {
		type: Object,
		default: () => {
			return {
				label: 'label',
				value: 'value',
				children: 'children'
			}
		}
	},
	video: {
		type: [String, Object] as PropType<any>,
		default: () => ({
			url: '',
			type: 'video/mp4',
		}),
	},
	connection: {
		type: Number,
		default: 0,
	},
	panels: {
		type: Array as PropType<any[]>,
		default: () => [
			{ id: 'editPwd', label: '修改密码', withDivider: true },
			{ id: 'logout', label: '退出' },
		]
	}
})
const emit = defineEmits(['update:connection', 'transInfo'])

const id = ref('')
const showMenuText = ref(true)
const renderMenu = computed(() => {
	return loopRoutes(props.menus, props.fields)
})
function loopRoutes(routes: any, fields: any) {
	let { label, value, children } = fields
	return routes.map((m: any, i: number) => {
		let temp = {
			icon: Reflect.has(m, 'icon') ? m.icon : '',
			path: Reflect.has(m, 'path') ? m.path : '',
			label: Reflect.has(m, 'meta') ? m.meta.label : m[label],
			value: Reflect.has(m, 'name') ? m.name : m[value],
		}
		if (Reflect.has(m, children)) {
			return Object.assign({}, temp, {
				children: m[children].length ? loopRoutes(m[children], fields) : null
			})
		} else {
			return Object.assign({}, temp)
		}
	})
}
let initTimer = null

let connectTimer: any = null
watch(() => props.connection, (v) => {
	if (v === 2) {
		clearTimeout(connectTimer);
		connectTimer = setTimeout(() => {
			console.log("a");
			emit("update:connection", 1);
		}, 500)
	}
})

const username = ref('')

onMounted(() => {
	id.value = `c-menu-${Math.ceil(Math.random() * 10000)}`
	username.value = sessionStorage.getItem('username') || '';
})

watch(() => props.menus, () => {
	username.value = sessionStorage.getItem('username') || '';
})
</script>
<style lang="less" scoped>
@import './css/scoped.less';
</style>
