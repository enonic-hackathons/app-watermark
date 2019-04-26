import { getSiteConfig } from '/lib/xp/portal';
import { forceArray } from '/lib/enonic/util/data';
import { render } from '/lib/xp/thymeleaf';

const AppVersionFinder = __.newBean('com.enonic.app.watermark.AppVersionFinder');

const view = resolve('./watermark.html');

const style = `<style>
.xp-watermark-container,
.xp-watermark-container * {
    box-sizing: border-box;
    pointer-events: none;
}
.xp-watermark-container {
	position: absolute;
    color: white;
    padding: 5px 40px;
    top: 62px;
    height: 50px;
    width: 300px;
    text-align: center;
    opacity: 0.75;
    filter: alpha(opacity=75);
    
}
.xp-watermark-container.right {
    right: -62px;
    transform: rotate(45deg);
}
.xp-watermark-container.left {
    left: -62px;
    transform: rotate(-45deg);
}
.xp-watermark-appname {
    font-size: 10px;
    display: inline-block;
    margin: 5px 5px 0;
}
.xp-watermark-version {
    font-size: 10px;
    font-weight: bold;
    display: inline-block;
    margin: 5px 5px 0;
}
.xp-watermark-text {
	display: inline-block;
	width: 100%;
	text-align: center;
    margin: 0;
    font-size: 12px;
}
</style>`;

exports.responseFilter = (req, res) => {
	if (req.mode === 'live') {
		log.info("req (" + typeof req + "): " + JSON.stringify(req, null, 2));
		//log.info("res (" + typeof res + "): " + JSON.stringify(res, null, 2));

		const siteConfig = getSiteConfig();
		//log.info("siteConfig (" + typeof siteConfig + "): " + JSON.stringify(siteConfig, null, 2));

		const version = siteConfig.app ?
			AppVersionFinder.getAppVersion(siteConfig.app) :
			null;
		//log.info("version (" + typeof version + "): " + JSON.stringify(version, null, 2));


		res.pageContributions = {
			...res.pageContributions,
			bodyBegin: forceArray(res.pageContributions.bodyBegin || []),
			headEnd: forceArray(res.pageContributions.headEnd || [])
		};


		if (siteConfig.app || siteConfig.text) {
			//log.info("Pushing watermark...");
			const waterMark = render(view, {
				...siteConfig,
				bgcolor: siteConfig.bgcolor || "#7799ee",
				version
			});
			//log.info("waterMark (" + typeof waterMark + "): " + JSON.stringify(waterMark, null, 2));
			res.pageContributions.bodyBegin.push(waterMark);
			res.pageContributions.headEnd.push(style);
		}

		//log.info("res (" + typeof res + "): " + JSON.stringify(res, null, 2));
	}
	return res;
};
