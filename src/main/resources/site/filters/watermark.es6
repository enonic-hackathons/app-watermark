import { getSite } from '/lib/xp/portal';
import { forceArray } from '/lib/enonic/util/data';

exports.responseFilter = (req, res) => {
	//log.info("req (" + typeof req + "): " + JSON.stringify(req, null, 2));
	//log.info("res (" + typeof res + "): " + JSON.stringify(res, null, 2));

	const appNames = forceArray(getSite().data.siteConfig)
		.map( appItem => ((appItem.applicationKey || "") + "").trim())
		.filter( appName => appName !== "" && appName !== app.name);
	log.info("appNames (" + typeof appNames + "): " + JSON.stringify(appNames, null, 2));
	return res;
};
