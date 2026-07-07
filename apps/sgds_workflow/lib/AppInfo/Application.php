<?php

declare(strict_types=1);

namespace OCA\SgdsWorkflow\AppInfo;

use OCP\AppFramework\App;
use OCP\AppFramework\Bootstrap\IBootstrap;
use OCP\AppFramework\Bootstrap\IBootContext;
use OCP\AppFramework\Bootstrap\IRegistrationContext;
use OCA\SgdsWorkflow\Dashboard\CircuitWidget;

class Application extends App implements IBootstrap
{
    public const APP_ID = 'sgds_workflow';

    public function __construct() { parent::__construct(self::APP_ID); }
    public function register(IRegistrationContext $context): void
    {
        $context->registerDashboardWidget(CircuitWidget::class);
    }
    public function boot(IBootContext $context): void {}
}
