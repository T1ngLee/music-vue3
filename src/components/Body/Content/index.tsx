/*
 * @Author: 挺子
 * @Description: 页面头部的 title，可能是导航菜单，可能是标题
 */

import { defineComponent, computed } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import RouteLinkList from './headerComp/RouteLinkList';
import PageTitle from './headerComp/PageTitle';

export default defineComponent({
	name: 'Content',
	setup() {
		const route = useRoute();

		// 获取匹配路由中的第一个路由的子路由
		const firstOrderChildren = computed(() => {
			const children = route.matched.length ? route.matched[0].children : [];
			return children.length ? children : false;
		});

		// 获取当前页面的标题
		const pageTitle = computed(() => {
			return route.meta.pageTitle as string;
		});

		return {
			firstOrderChildren,
			pageTitle,
		};
	},
	render() {
		let header = null;
		if (this.firstOrderChildren || this.pageTitle) {
			header = (
				<div class="mb-5 flex-none px-8">
					{
						// 如果当前路由没有子路由则不加载导航菜单
						this.firstOrderChildren ? (
							<RouteLinkList routeList={this.firstOrderChildren} />
						) : this.pageTitle ? (
							<PageTitle title={this.pageTitle} />
						) : (
							''
						)
					}
				</div>
			);
		}

		return (
			<div id="content" class="h-full flex-grow break-all pt-5 select-none flex flex-col">
				{header}
				<div id="vvv" class="flex-auto overflow-auto w-full h-full pb-5 px-8">
					<div class="xl:w-bigScreen m-auto">
						<RouterView />
					</div>
				</div>
			</div>
		);
	},
});
