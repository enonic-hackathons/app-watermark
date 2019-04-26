import { getSite } from '/lib/xp/portal';
import { forceArray } from '/lib/enonic/util/data';

exports.get = req => {
	const appNames = forceArray(getSite().data.siteConfig)
		.map( appItem => ((appItem.applicationKey || "") + "").trim())
		.filter( appName => appName !== "" && appName !== app.name)
		.map( appName => ({
			id: appName,
			displayName: appName,
			description: appName
		}) );

	return {
		contentType: 'application/json',
		body: {
			total: appNames.length,
			count: appNames.length,
			hits: appNames
		}
	}
}
