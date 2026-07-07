<?php
declare(strict_types=1);
namespace OCA\SgdsKpi\Dashboard;

use OCA\SgdsKpi\Service\KpiService;
use OCP\Dashboard\IWidget;
use OCP\IL10N;
use OCP\IURLGenerator;

class SgdsKpiWidget implements IWidget
{
    public function __construct(
        private KpiService $kpiService,
        private IL10N $l10n,
        private IURLGenerator $urlGenerator,
    ) {}

    public function getId(): string { return 'sgds_kpi_dashboard'; }
    public function getTitle(): string { return '📊 SGDS — Tableau de Bord'; }
    public function getDescription(): string { return 'Dossiers par statut, délais, taux d\'approbation, charge par agent'; }
    public function getIconUrl(): string { return $this->urlGenerator->imagePath('sgds_kpi', 'app.svg'); }
    public function getUrl(): ?string { return $this->urlGenerator->linkToRoute('sgds_kpi.kpi.dashboard'); }
    public function getOrder(): int { return 20; }
    public function getIconClass(): string { return ''; }
    public function load(): void { \OCP\Util::addScript('sgds_kpi', 'dashboard-widget'); }
}
