<?php
declare(strict_types=1);
namespace OCA\SgdsDossier\Dashboard;

use OCP\Dashboard\IWidget;
use OCP\IL10N;
use OCP\IURLGenerator;

class QuickActionsWidget implements IWidget
{
    public function __construct(private IL10N $l10n, private IURLGenerator $url) {}
    public function getId(): string { return 'sgds_quick_actions'; }
    public function getTitle(): string { return '⚡ Actions rapides'; }
    public function getOrder(): int { return 5; }
    public function getIconClass(): string { return 'icon-add'; }
    public function getUrl(): ?string { return $this->url->linkToRoute('sgds_dossier.widget.quickActions'); }
    public function load(): void {}
}
