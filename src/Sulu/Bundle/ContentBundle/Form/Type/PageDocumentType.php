<?php

/*
 * This file is part of the Sulu.
 *
 * (c) MASSIVE ART WebServices GmbH
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

namespace Sulu\Bundle\ContentBundle\Form\Type;

use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class PageDocumentType extends BasePageDocumentType
{
    /**
     * {@inheritDoc}
     */
    public function setDefaultOptions(OptionsResolverInterface $options)
    {
        $options->setDefaults([
            'data_class' => 'Sulu\Bundle\ContentBundle\Document\PageDocument',
        ]);

        parent::setDefaultOptions($options);
    }

    /**
     * {@inheritDoc}
     */
    public function getName()
    {
        return 'page';
    }
}