/**
 * SGDS Metadata — File Sidebar JavaScript
 *
 * Injects metadata panel into the file details sidebar.
 */

(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        // Register the metadata sidebar tab
        if (window.OCA && window.OCA.Files && window.OCA.Files.Sidebar) {
            const MetadataTab = {
                _render: function(fileInfo) {
                    const container = document.createElement('div');
                    container.id = 'sgds-metadata-panel';
                    container.innerHTML = '<div class="sgds-loading">Chargement des métadonnées...</div>';
                    
                    // Load metadata for this file
                    const fileId = fileInfo.id;
                    const url = OC.generateUrl('/apps/sgds_metadata/api/file/{fileId}', {fileId: fileId});
                    
                    fetch(url)
                        .then(response => response.json())
                        .then(data => {
                            container.innerHTML = renderMetadataForm(fileInfo, data);
                        })
                        .catch(err => {
                            container.innerHTML = '<div class="sgds-error">Erreur de chargement</div>';
                            console.error('SGDS Metadata:', err);
                        });
                    
                    return container;
                }
            };
            
            // Register the sidebar tab
            window.OCA.Files.Sidebar.registerTab(new OCA.Files.Sidebar.Tab({
                id: 'sgds-metadata',
                name: 'Métadonnées',
                icon: 'icon-category-tools',
                render: MetadataTab._render
            }));
        }
    });
    
    /**
     * Render the metadata form
     */
    function renderMetadataForm(fileInfo, metadata) {
        let html = '<h3>' + t('sgds_metadata', 'Métadonnées du document') + '</h3>';
        html += '<form id="sgds-metadata-form">';
        html += '<div class="sgds-metadata-fields">';
        
        // Document type selector
        html += '<div class="sgds-field">';
        html += '<label>' + t('sgds_metadata', 'Type de document') + '</label>';
        html += '<select id="sgds-doc-type" class="sgds-input">';
        html += '<option value="">-- Sélectionner --</option>';
        const docTypes = {
            'courrier_arrivee': 'Courrier Arrivée',
            'courrier_depart': 'Courrier Départ',
            'arrete': 'Arrêté',
            'note_technique': 'Note Technique',
            'note_presentation': 'Note de Présentation',
            'rapport': 'Rapport',
            'contrat': 'Contrat',
            'proces_verbal': 'Procès-Verbal',
            'decision': 'Décision',
            'circulaire': 'Circulaire',
            'fiche_technique': 'Fiche Technique',
            'annexe': 'Annexe'
        };
        for (const [key, label] of Object.entries(docTypes)) {
            html += '<option value="' + key + '">' + label + '</option>';
        }
        html += '</select></div>';
        
        // Dynamic fields container
        html += '<div id="sgds-dynamic-fields"></div>';
        
        html += '<button type="submit" class="primary">' + 
            t('sgds_metadata', 'Enregistrer') + '</button>';
        html += '</div></form>';
        
        return html;
    }
})();
