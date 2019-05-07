import { getSiteConfig, assetUrl } from '/lib/xp/portal';
import { forceArray } from '/lib/enonic/util/data';
import { render } from '/lib/xp/thymeleaf';

const AppVersionFinder = __.newBean('com.enonic.app.watermark.AppVersionFinder');

const view = resolve('./watermark.html');

let STYLE;

exports.responseFilter = (req, res) => {
	log.info("req (" + typeof req + "): " + JSON.stringify(req, null, 2));
	//log.info("res (" + typeof res + "): " + JSON.stringify(res, null, 2));

	const siteConfig = getSiteConfig();
	log.info("siteConfig (" + typeof siteConfig + "): " + JSON.stringify(siteConfig, null, 2));
	log.info("req.mode (" + typeof req.mode + "): " + JSON.stringify(req.mode, null, 2));

	if (siteConfig[req.mode]) {

		if (!STYLE) {
			STYLE = `<link rel="stylesheet" href="${assetUrl({ path: 'app-watermark/style.css' })}">`;
		}

		const version = siteConfig.app ?
			AppVersionFinder.getAppVersion(siteConfig.app) :
			null;
		//log.info("version (" + typeof version + "): " + JSON.stringify(version, null, 2));


		res.pageContributions = {
			...res.pageContributions,
			bodyBegin: forceArray(res.pageContributions.bodyBegin || []),
			headEnd: forceArray(res.pageContributions.headEnd || [])
		};

		const labelFirst = siteConfig.order !== 'appFirst';

		const position = siteConfig.position + (siteConfig.fixed ? " fixed" : "");



		if (siteConfig.app || siteConfig.label) {
			//log.info("Pushing watermark...");
			const model = {
				...siteConfig,
				position,
				labelFirst,
				appFirst: !labelFirst,
				bgcolor: siteConfig.bgcolor || "rgba(0,0,0,.75)",
				version
			};
			log.info("model (" + typeof model + "): " + JSON.stringify(model, null, 2));

			const waterMark = render(view, model);
			//log.info("waterMark (" + typeof waterMark + "): " + JSON.stringify(waterMark, null, 2));
			res.pageContributions.bodyBegin.push(waterMark);
			res.pageContributions.headEnd.push(STYLE);
		}

		//log.info("res (" + typeof res + "): " + JSON.stringify(res, null, 2));
	}
	return res;
};
