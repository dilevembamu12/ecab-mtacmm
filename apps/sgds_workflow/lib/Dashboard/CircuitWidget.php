<?php
declare(strict_types=1);
namespace OCA\SgdsWorkflow\Dashboard;

use OCP\Dashboard\IWidget;
use OCP\IL10N;
use OCP\IURLGenerator;

class CircuitWidget implements IWidget
{
    public function __construct(
        private IL10N $l10n,
        private IURLGenerator $url,
    ) {}

    public function getId(): string { return 'sgds_circuit_view'; }
    public function getTitle(): string { return '🔄 Circuit Pôle 5'; }
    public function getOrder(): int { return 15; }
    public function getIconClass(): string { return 'icon-workflow'; }
    public function getUrl(): ?string { return $this->url->linkToRoute('sgds_workflow.widget.circuit'); }
    public function load(): void {}
}
