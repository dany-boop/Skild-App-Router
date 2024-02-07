import NProgress from 'nprogress';

export function onStart(hexColor: string = '#0dcaf0', barHeightPx: number = 8, spinnerDiameterPx: number = 200) {
	NProgress.start();
}

export function onComplete() {
	NProgress.done();
}
