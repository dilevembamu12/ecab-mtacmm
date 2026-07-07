<?php
declare(strict_types=1);
namespace OCA\SgdsDossier\Dashboard;

use OCP\Dashboard\IWidget;
use OCP\IL10N;
use OCP\IURLGenerator;
use OCP\IUserSession;

class PendingDossiersWidget implements IWidget
{
    public function __construct(
        private IL10N $l10n,
        private IURLGenerator $url,
        private IUserSession $userSession,
    ) {}

    public function getId(): string { return 'sgds_pending_dossiers'; }
    public function getTitle(): string { return '📋 Mes dossiers en attente'; }
    public function getOrder(): int { return 10; }
    public function getIconClass(): string { return 'icon-folder'; }
    public function getUrl(): ?string { return $this->url->linkToRoute('sgds_dossier.widget.pending'); }
    public function load(): void {}
}
