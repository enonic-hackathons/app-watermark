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

	log.info("watermark appNames (" + typeof appNames + "): " + JSON.stringify(appNames, null, 2));

	return {
		contentType: 'application/json',
		body: {
			total: appNames.length,
			count: appNames.length,
			hits: appNames
		}
	}
}
