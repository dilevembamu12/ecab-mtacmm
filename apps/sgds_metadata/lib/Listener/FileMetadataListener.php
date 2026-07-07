<?php

declare(strict_types=1);

namespace OCA\SgdsMetadata\Listener;

use OCP\EventDispatcher\Event;
use OCP\EventDispatcher\IEventListener;
use OCP\Files\Events\Node\NodeWrittenEvent;
use OCP\Files\File;
use Psr\Log\LoggerInterface;
use OCA\SgdsMetadata\Service\MetadataService;

/**
 * Listens for file write events to update metadata cache/audit
 *
 * @implements IEventListener<NodeWrittenEvent>
 */
class FileMetadataListener implements IEventListener
{
    public function __construct(
        private LoggerInterface $logger,
        private MetadataService $metadataService,
    ) {
    }

    public function handle(Event $event): void
    {
        if (!($event instanceof NodeWrittenEvent)) {
            return;
        }

        $node = $event->getNode();

        // Only track files, not folders
        if (!($node instanceof File)) {
            return;
        }

        $fileId = $node->getId();

        // Log metadata changes for audit trail
        $this->logger->info('File metadata event: fileId=' . $fileId, [
            'app' => 'sgds_metadata',
            'path' => $node->getPath(),
            'mtime' => $node->getMTime(),
        ]);
    }
}
