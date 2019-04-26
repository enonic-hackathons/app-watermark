const portal = require('/lib/xp/portal');

exports.responseFilter = (req, res) => {
	//log.info("req (" + typeof req + "): " + JSON.stringify(req, null, 2));
	//log.info("res (" + typeof res + "): " + JSON.stringify(res, null, 2));

	const siteInfo = portal.getSite();
	log.info("siteInfo (" + typeof siteInfo + "): " + JSON.stringify(siteInfo, null, 2));
	return res;
};
