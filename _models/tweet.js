can.Model("CanJSUS.Tweet", {
	//TODO: remove models() once the Bithub API can filter
	models: function(list) {
		var models = list.data.filter(function(el) {
			return el.feed === 'twitter' && el.category === 'twitter';
		}).map(function(el) {
			return CanJSUS.Tweet.model(el);
		});

		return new can.Observe.List(models.slice(0, 3));
	},
	model: function(data) {
		return {
			handle: data.actor,
			realName: data.source_data.user.name,
			picture: data.source_data.user.profile_image_url,
			body: data.title,

			feed: data.feed,
			link: data.link,
			points: data.points,
			date: new Date(data.updated_ts.substring(0, data.updated_ts.length - 5) + 'Z')
		};
	},
	findAll: {
		url: 'http://bithub.com/api/events/?feed=twitter&order=origin_ts:desc&limit=3',
		dataType: 'json'
	}
}, { });