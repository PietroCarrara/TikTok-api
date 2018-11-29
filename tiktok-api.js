var tiktok = {}

tiktok.apiUrl = 'http://localhost:8181'

tiktok.mandatoryParams = 'aid=1233&mas=01338126947f9eff7d978258a1e8be45042c2c2c1cec2c8666461c'

tiktok.getFeed = function(maxCursor = '') {

	return fetch(this.apiUrl + `/aweme/v1/feed/?max_cursr=${maxCursor}&` + this.mandatoryParams, {
		method: 'GET',
		mode: 'cors'
	})
	.then(res => 
	{
		var obj = await res.json()
		if (obj.has_more != 0) {
			tiktok.next = function() {
				return tiktok.getFeed(obj.max_cursor)
			}
		} else {
			tiktok.next = null
		}

		return obj
	})
}

tiktok.getUserFavs = function(userID, maxCursor = '') {
	console.log(userID, maxCursor)

	return fetch(this.apiUrl + `/aweme/v1/aweme/favorite/?gaid=cc596c3d-4b9d-478a-85a7-546ac14fb67a&user_id=${userID}&max_cursor=${maxCursor}&` + this.mandatoryParams, {
		method: 'GET',
		mode: 'cors'
	})
	.then(async res =>
	{
		var obj = await res.json()
		if (obj.has_more != 0) {
			tiktok.next = function() {
				return tiktok.getUserFavs(userID, obj.max_cursor)
			}
		} else {
			tiktok.next = null
		}

		return obj
	})
}

// A function to iterate through pages of awemes
// When it is null, there are no more pages
tiktok.next = null
