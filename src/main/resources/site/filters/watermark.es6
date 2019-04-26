import { getSiteConfig } from '/lib/xp/portal';

exports.responseFilter = (req, res) => {
	log.info("req (" + typeof req + "): " + JSON.stringify(req, null, 2));
	//log.info("res (" + typeof res + "): " + JSON.stringify(res, null, 2));

	const siteConfig = getSiteConfig();
	log.info("siteConfig (" + typeof siteConfig + "): " + JSON.stringify(siteConfig, null, 2));

	return res;
};
