/*
 * Copyright (C) 2016 Red Hat, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package io.syndesis.integration.project.generator;

import java.util.Optional;

import io.swagger.models.Operation;
import io.swagger.models.Path;
import io.swagger.models.Swagger;
import io.syndesis.common.model.connection.Connection;
import io.syndesis.common.model.integration.Flow;
import io.syndesis.common.model.integration.Integration;
import io.syndesis.common.model.integration.Scheduler;
import io.syndesis.common.model.integration.Step;
import io.syndesis.common.model.integration.StepKind;
import org.junit.Test;

import static org.assertj.core.api.Assertions.assertThat;

public class ProjectGeneratorHelperTest {

    @Test
    public void shouldNormalizeSwaggerBasePaths() {
        final Swagger swagger = new Swagger().path("/path", new Path().get(new Operation()));

        assertThat(ProjectGeneratorHelper.normalizePaths(swagger).getPaths()).containsOnlyKeys("/path");
        assertThat(ProjectGeneratorHelper.normalizePaths(swagger.basePath("/api")).getPaths()).containsOnlyKeys("/api/path");
    }
}