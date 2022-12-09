<template>
	<div :class="`flex1 flex-row-center-between c-menu-wrap`" :id="id">
		<!-- 背景动画 -->
		<div class="header-video-wrapper">
			<video autoplay loop muted class="header-video">
				<source :src="video" type="video/mp4">
			</video>
		</div>
		<!-- 项目介绍 -->
		<div class="flex-row-center logo-wrap">
			<slot name="project-l"></slot>
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
			<div class="flex-row-center user-item">
				<i class="cursor iconfont icon-user"></i>
				<span class="mlr5 nowrap">管理员</span>
				<i class="cursor iconfont icon-zhankai"></i>
			</div>
			<div class="task-item">
				<i class="cursor iconfont icon-task"></i>
			</div>
			<div class="task-item">
				<i class="cursor iconfont icon-task"></i>
			</div>
			<slot name='extend-r'></slot>
			<div class="self-divider divider"></div>
			<div class="flex-row-center ws-status">
				<i class="cursor iconfont icon-"></i>
			</div>
		</div>
	</div>
</template>

<script>
export default { name: "c-menu" };
</script>
<script setup>
import { ref, watch, computed, onMounted, onUnmounted } from 'vue'
let props = defineProps({
	project: {
		type: Object,
		default: () => {
			return {
				title: '项目名称Project name'
			}
		}
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
	menus: {
		type: Array,
		default: () => [
			{
				icon: 'task',
				label: '导航1',
				value: 'menu1',
				children: [
					{ path: '/components/button', label: '导航', value: 'menu11' },
					{ path: '/components/table', label: '导航导航', value: 'menu11' },
					{ path: '/modules/menu', label: '导航导航导航', value: 'menu12' }
				]
			},
			{ path: '/components/button', icon: 'task', label: '导航2', value: 'menu2' },
			{
				icon: 'task',
				label: '导航3',
				value: 'menu3',
				children: [
					{ label: '导航31', value: 'menu31' },
				]
			},
		]
	},
	video: {
		type: String,
		default: "",
	},
	opts: {

	}
})
let id = ref('')
let timer = null
let extendList = ref([
	{ tip: 'SOCKET', label: 'SOCKET', icon: 'lianjie' },
	{ label: '主页', icon: 'home' },
	{ tip: '日历', label: '日历', icon: 'rili' },
	{ label: '用户', icon: 'yonghu' },
])
let showMenuText = ref(true)
let menuW = ref(0)
let originMenuW = ref(0)
let renderMenu = computed(() => {
	return loopRoutes(props.menus, props.fields)
})
function loopRoutes(routes, fields) {
	let { label, value, children } = fields
	return routes.map((m, i) => {
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
function getMenuWidth() {
	if (timer) {
		clearTimeout(timer)
	}
	timer = setTimeout(() => {
		// let menuWrapEl = document.querySelector('.hp-menu-wrap') as HTMLElement
		// let menuWrapW = menuWrapEl.offsetWidth

		// let logoEl = document.querySelector('.hp-menu-wrap .logo-wrap') as HTMLElement
		// let logoW = logoEl.offsetWidth

		let menuEl = document.querySelector(`#${id.value} .menu-wrap`)
		menuW.value = menuEl.offsetWidth
		// let menuW = menuEl.offsetWidth

		// let extendEl = document.querySelector('.hp-menu-wrap .extend-wrap') as HTMLElement
		// let extendW = extendEl.offsetWidth
		// console.log(menuWrapW, logoW, menuW, extendW, logoW + menuW + extendW, menuWrapW > (logoW + menuW + extendW))
		// console.log('0000', menuW, originMenuW.value)

		// if (originMenuW.value > menuW) {
		//     showTitle.value = false
		//     // if (showTitle.value) {
		//     //     showTitle.value = false
		//     // }
		//     // if (!showTitle.value) {
		//     //     showMenuText.value = false
		//     // }
		// }
		// if (originMenuW.value < menuW) {
		//     // showTitle.value = true
		//     // if (showTitle.value) {
		//     //     showMenuText.value = true
		//     // }
		//     // if (!showTitle.value) {
		//     //     showTitle.value = true
		//     // }
		// }
	}, 500)
}

onMounted(() => {
	id.value = `menu-${Math.ceil(Math.random() * 10000)}`
	let items = document.querySelectorAll(`#${id.value} .menu-item`)
	console.log(items)
	items.forEach((el) => originMenuW.value += el.offsetWidth)

	getMenuWidth()
	window.addEventListener('resize', getMenuWidth)
})

onUnmounted(() => {
	window.removeEventListener('resize', getMenuWidth)
})
watch(() => menuW.value, (val, pre) => {
	// console.log(val, pre)
	// if (val > pre) {
	// 	console.log('在变大')
	// 	if (!showTitle.value) {
	// 		if (val > originMenuW.value) {
	// 			showMenuText.value = true
	// 		}
	// 	} else {
	// 		// if (val < originMenuW.value) {
	// 		//     showMenuText.value = false
	// 		// }
	// 	}
	// } else {
	// 	console.log('在变小')
	// 	if (showTitle.value) {
	// 		if (val < originMenuW.value) {
	// 			showTitle.value = false
	// 		}
	// 	} else {
	// 		if (val < originMenuW.value) {
	// 			showMenuText.value = false
	// 		}
	// 	}
	// }
})
</script>
<style lang="less" scoped>
@import './css/scoped.less';
</style>

