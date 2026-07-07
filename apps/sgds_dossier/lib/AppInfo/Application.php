<?php

declare(strict_types=1);

namespace OCA\SgdsDossier\AppInfo;

use OCP\AppFramework\App;
use OCP\AppFramework\Bootstrap\IBootstrap;
use OCP\AppFramework\Bootstrap\IBootContext;
use OCP\AppFramework\Bootstrap\IRegistrationContext;
use OCA\SgdsDossier\Dashboard\PendingDossiersWidget;
use OCA\SgdsDossier\Dashboard\QuickActionsWidget;

class Application extends App implements IBootstrap
{
    public const APP_ID = 'sgds_dossier';

    public function __construct() { parent::__construct(self::APP_ID); }
    public function register(IRegistrationContext $context): void
    {
        $context->registerDashboardWidget(PendingDossiersWidget::class);
        $context->registerDashboardWidget(QuickActionsWidget::class);
    }
    public function boot(IBootContext $context): void
    {
        \OCP\Util::addStyle(self::APP_ID, 'dashboard-widgets');
    }
}
