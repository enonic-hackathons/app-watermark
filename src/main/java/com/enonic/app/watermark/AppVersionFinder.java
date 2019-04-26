package com.enonic.app.watermark;

import com.enonic.xp.app.Application;
import com.enonic.xp.app.ApplicationKey;
import com.enonic.xp.app.ApplicationService;
import com.enonic.xp.script.bean.BeanContext;
import com.enonic.xp.script.bean.ScriptBean;
import org.osgi.framework.Version;

import java.util.function.Supplier;

/**
 * Created on 2019-04-26 as part of
 */
public class AppVersionFinder implements ScriptBean {

	private Supplier<ApplicationService> applicationServiceSupplier;

	public String getAppVersion(String appKey) {
		Application app = applicationServiceSupplier.get().getInstalledApplication(ApplicationKey.from(appKey));
		Version appVersion = app.getVersion();
		return appVersion.toString();
	}

	@Override
	public void initialize(BeanContext context) {
		applicationServiceSupplier = context.getService(ApplicationService.class);
	}
}
