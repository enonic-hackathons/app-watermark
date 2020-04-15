import { getSiteConfig, assetUrl, getSite } from '/lib/xp/portal';
import { forceArray } from '/lib/util/data';
import { render } from '/lib/thymeleaf';

const AppVersionFinder = __.newBean('com.enonic.app.watermark.AppVersionFinder');

const view = resolve('./watermark.html');

let STYLE;

const calcLayoutDimensions = (siteConfig) => {
	const cornerToLongestDiag = siteConfig.width + siteConfig.cornerDist;
	const longestDiag = cornerToLongestDiag * 2;
	const containerSides = Math.floor(Math.sqrt(Math.pow(longestDiag,2) / 2));

	const cornerToMiddleDiag = siteConfig.cornerDist + (siteConfig.width / 2);
	const cornerToMiddleSides = Math.floor(Math.sqrt(Math.pow(cornerToMiddleDiag,2) / 2));
	const wrongCornerCorrection = Math.floor(Math.sqrt(Math.pow(siteConfig.width,2) / 2));

	const deltaX = siteConfig.position === 'right' ?
		((longestDiag / 2) - cornerToMiddleSides - wrongCornerCorrection) :
		cornerToMiddleSides -((longestDiag / 2) - wrongCornerCorrection * 0);

	const deltaY = (cornerToMiddleSides - (siteConfig.width / 2));

	//log.info("checklist calcLayoutDimensions sub-values: " + JSON.stringify({cornerToLongestDiag, cornerToMiddleDiag, cornerToMiddleSides, wrongCornerCorrection}, null, 2));
	return { containerSides, longestDiag, deltaX, deltaY };
};


exports.responseProcessor = (req, res) => {
	//log.info("req (" + typeof req + "): " + JSON.stringify(req, null, 2));
	//log.info("pre res (" + typeof res + "): " + JSON.stringify(res, null, 2));

	const siteConfig = getSiteConfig();
	//log.info("siteConfig (" + typeof siteConfig + "): " + JSON.stringify(siteConfig, null, 2));

	if (siteConfig[req.mode] && (siteConfig.app || siteConfig.label)) {

		res.pageContributions = {
			...res.pageContributions,
			bodyBegin: forceArray(res.pageContributions.bodyBegin || []),
			headEnd: forceArray(res.pageContributions.headEnd || [])
		};

		const layoutDimensions = calcLayoutDimensions(siteConfig);
		//log.info("layoutDimensions (" + typeof layoutDimensions + "): " + JSON.stringify(layoutDimensions, null, 2));

		const labelFirst = siteConfig.order !== 'appFirst';
		const fixed = siteConfig.fixed ? 'fixed' : '';

		const version = siteConfig.app ?
			AppVersionFinder.getAppVersion(siteConfig.app) :
			null;
		//log.info("version (" + typeof version + "): " + JSON.stringify(version, null, 2));

		const model = {
			...siteConfig,
			...layoutDimensions,
			rightOrLeft: siteConfig.position,
			fixed,
			labelFirst,
			appFirst: !labelFirst,
			bgcolor: siteConfig.bgcolor || 'rgba(0,0,0,.75)',
			version
		};
		//log.info("model (" + typeof model + "): " + JSON.stringify(model, null, 2));

		const waterMark = render(view, model);
		//log.info("waterMark (" + typeof waterMark + "): " + JSON.stringify(waterMark, null, 2));
		res.pageContributions.bodyBegin.push(waterMark);


		if (!STYLE) {
			STYLE = `<link rel="stylesheet" href="${assetUrl({ path: 'app-watermark/style.css' })}">`;
		}
		res.pageContributions.headEnd.push(STYLE);
	}

	//log.info("post res (" + typeof res + "): " + JSON.stringify(res, null, 2));
	return res;
};
