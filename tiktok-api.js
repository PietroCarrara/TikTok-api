var tiktok = {}

tiktok.apiUrl = 'http://localhost:8181'

tiktok.mandatoryParams = 'aid=1233&mas='

tiktok.getFeed = function() {

	return fetch(this.apiUrl + '/aweme/v1/feed/?' + this.mandatoryParams, {
		method: 'GET',
		mode: 'cors'
	})
	.then(res => res.json())

}
