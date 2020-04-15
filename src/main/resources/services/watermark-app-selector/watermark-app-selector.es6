import { getSite } from '/lib/xp/portal';
import { forceArray } from '/lib/util/data';

exports.get = req => {
	log.info("getSite() (" +
		(Array.isArray(getSite()) ?
			("array[" + getSite().length + "]") :
			(typeof getSite() + (getSite() && typeof getSite() === 'object' ? (" with keys: " + JSON.stringify(Object.keys(getSite()))) : ""))
		) + "): " + JSON.stringify(getSite(), null, 2)
	);
/*
	const appNames = forceArray(getSite().data.siteConfig)
		.map( appItem => ((appItem.applicationKey || "") + "").trim())
		.filter( appName => appName !== "" && appName !== app.name)
		.map( appName => ({
			id: appName,
			displayName: appName,
			description: appName
		}) );
*/
	return {
		contentType: 'application/json',
		body: {
			total: 0, //appNames.length,
			count: 0, //appNames.length,
			hits: [] //appNames
		}
	}
};
