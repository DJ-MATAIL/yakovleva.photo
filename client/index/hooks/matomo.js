function onMatomoScriptReady() {
	return window._paq && window._paq.push
}

function setUrl(url) {
	onMatomoScriptReady() && window._paq.push([ 'setCustomUrl', url ])
}

function setReferrerUrl(url) {
	onMatomoScriptReady() && window._paq.push([ 'setReferrerUrl', url ])
}

function setTitle(title) {
	onMatomoScriptReady() && window._paq.push([ 'setDocumentTitle', title ])
}

function viewPage() {
	onMatomoScriptReady() && window._paq.push([ 'trackPageView' ])
}

function setGenerationTime(ms) {
	onMatomoScriptReady() && window._paq.push([ 'setGenerationTimeMs', ms ])
}

export function useMatomo() {
	return {
		setUrl,
		setReferrerUrl,
		setTitle,
		viewPage,
		setGenerationTime
	}
}